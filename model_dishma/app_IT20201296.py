import os
import cv2
import numpy as np
from flask import Flask, request, jsonify
from PIL import Image
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Layer
from flask_cors import CORS
import tempfile
import mediapipe as mp
from cvzone.FaceMeshModule import FaceMeshDetector

app = Flask(__name__)
CORS(app)

# Load the Siamese model
class L1Dist(Layer):
    def __init__(self, **kwargs):
        super().__init__()

    def call(self, input_embedding, validation_embedding):
        return tf.math.abs(input_embedding - validation_embedding)

siamese_model = load_model('siamesemodelv2.h5', custom_objects={'L1Dist': L1Dist})

# Create a FaceMeshDetector object to detect face landmarks
detector = FaceMeshDetector(maxFaces=1)

# Load face mesh model for head pose estimation
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

def preprocess_image(image):
    # Resize the image to match the model input size (100x100 pixels)
    image = image.resize((100, 100))
    # Convert to numpy array and normalize pixel values
    image = np.array(image) / 255.0
    return image

def calculate_blink_count(video_path):
    cap = cv2.VideoCapture(video_path)
    ratioList = []
    blinkCounter = 0
    counter = 0

    while True:
        ret, img = cap.read()
        if not ret:
            break

        img, faces = detector.findFaceMesh(img, draw=False)

        if faces:
            face = faces[0]
            leftUp = face[159]
            leftDown = face[23]
            leftLeft = face[130]
            leftRight = face[243]
            lengthVer, _ = detector.findDistance(leftUp, leftDown)
            lengthHor, _ = detector.findDistance(leftLeft, leftRight)
            ratio = int((lengthVer / lengthHor) * 100)
            ratioList.append(ratio)

            if len(ratioList) > 3:
                ratioList.pop(0)

            ratioAvg = sum(ratioList) / len(ratioList)

            if ratioAvg < 35 and counter == 0:
                blinkCounter += 1
                counter = 1
            if counter != 0:
                counter += 1
                if counter > 10:
                    counter = 0

    cap.release()
    return blinkCounter

@app.route('/verify', methods=['POST'])
def verify_image_video():
    if 'image' not in request.files or 'video' not in request.files:
        return jsonify({'error': 'Missing image or video file'}), 400

    image_file = request.files['image']
    video_file = request.files['video']

    if not image_file or not video_file:
        return jsonify({'error': 'Invalid image or video file'}), 400

    allowed_image_extensions = {'jpg', 'jpeg', 'png', 'gif'}
    allowed_video_extensions = {'mp4', 'avi', 'mov', 'mkv'}

    image_extension = image_file.filename.split('.')[-1].lower()
    video_extension = video_file.filename.split('.')[-1].lower()

    if image_extension not in allowed_image_extensions or video_extension not in allowed_video_extensions:
        return jsonify({'error': 'Invalid file format. Supported formats: images (jpg, jpeg, png, gif) and videos (mp4, avi, mov, mkv)'}), 400

    image = Image.open(image_file)
    image = preprocess_image(image)

    with tempfile.NamedTemporaryFile(suffix=f".{video_extension}", delete=False) as temp_video_file:
        video_file.save(temp_video_file.name)

    blink_count = calculate_blink_count(temp_video_file.name)

    video_capture = cv2.VideoCapture(temp_video_file.name)

    frames = []
    frame_count = 0
    max_frames = 30

    total_frames = 0
    forward_frames = 0

    while frame_count < max_frames:
        ret, frame = video_capture.read()
        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(frame_rgb)

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                left_eye = face_landmarks.landmark[33]
                right_eye = face_landmarks.landmark[263]
                eye_midpoint_x = (left_eye.x + right_eye.x) / 2
                eye_midpoint_y = (left_eye.y + right_eye.y) / 2

                if 0.4 < eye_midpoint_x < 0.6 and 0.3 < eye_midpoint_y < 0.7:
                    forward_frames += 1

                total_frames += 1

        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame = Image.fromarray(frame)
        frame = preprocess_image(frame)
        frames.append(frame)
        frame_count += 1

    forward_percentage = (forward_frames / total_frames) * 100

    similarity_scores = []
    for frame in frames:
        similarity_score = siamese_model.predict([np.expand_dims(image, axis=0), np.expand_dims(frame, axis=0)])[0][0]
        similarity_scores.append(similarity_score)

    avg_similarity_score = np.mean(similarity_scores)

    verification_threshold = 0.40
    match = avg_similarity_score >= verification_threshold
    match_int = int(match)
    avg_similarity_score = float(avg_similarity_score)

    # Calculate the duration of the uploading video in seconds
    duration_new = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT) / video_capture.get(cv2.CAP_PROP_FPS))

    # Calculate expected eye count based on the duration of the video
    expected_eye_count = (30 / 60) * duration_new

    # Calculate eye percentage
    eye_percentage = (blink_count / expected_eye_count) * 100

    # Calculate not pose percentage
    not_pose = 100 - forward_percentage

    # Calculate stress level
    stress_level = (0.5 * eye_percentage) + (0.5 * not_pose)

    video_capture.release()
    os.remove(temp_video_file.name)

    return jsonify({
        'match': match_int,
        'avg_similarity_score': avg_similarity_score,
        'headPosePercentage': forward_percentage,
        'blinkCount': blink_count,
        'stressLevel': stress_level,  # Include stress level in the response
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
