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
import imutils
import f_detector

app = Flask(__name__)
CORS(app)



class L1Dist(Layer):
    def __init__(self, **kwargs):
        super().__init__()

    def call(self, input_embedding, validation_embedding):
        return tf.math.abs(input_embedding - validation_embedding)


# Load the Siamese model
siamese_model = load_model('siamesemodelv2.h5', custom_objects={'L1Dist': L1Dist})

# Load face mesh model for head pose estimation
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Initialize eye blink detector
detector = f_detector.eye_blink_detector()

# Define a function to preprocess images


def preprocess_image(image):
    # Resize the image to match the model input size (100x100 pixels)
    image = image.resize((100, 100))
    # Convert to numpy array and normalize pixel values
    image = np.array(image) / 255.0
    return image


@app.route('/verify', methods=['POST'])
def verify_image_video():
    if 'image' not in request.files or 'video' not in request.files:
        return jsonify({'error': 'Missing image or video file'}), 400

    image_file = request.files['image']
    video_file = request.files['video']

    if not image_file or not video_file:
        return jsonify({'error': 'Invalid image or video file'}), 400
    
   #new
   # Perform eye blink detection on the video
    blink_count = 0
    vs = cv2.VideoCapture(video_file)
    while True:
        ret, frame = vs.read()
        if not ret:
            break

        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # Detect face and eyes
        rectangles = detector.detector_faces(frame, 0)
        boxes_face = f_detector.convert_rectangles2array(rectangles, frame)
        if len(boxes_face) != 0:
            # Select the face with the largest area
            areas = f_detector.get_areas(boxes_face)
            index = np.argmax(areas)
            rectangles = rectangles[index]
            # Detect eye blink
            COUNTER, TOTAL = detector.eye_blink(frame, rectangles, 0, 0)
            blink_count += TOTAL

    vs.release()

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
        similarity_score = siamese_model.predict(
            [np.expand_dims(image, axis=0), np.expand_dims(frame, axis=0)])[0][0]
        similarity_scores.append(similarity_score)

    avg_similarity_score = np.mean(similarity_scores)

    verification_threshold = 0.40
    match = avg_similarity_score >= verification_threshold
    match_int = int(match)
    avg_similarity_score = float(avg_similarity_score)

    video_capture.release()
    os.remove(temp_video_file.name)

    return jsonify({
        'match': match_int,
        'avg_similarity_score': avg_similarity_score,
        'headPosePercentage': forward_percentage,
        'eyeBlinkCount': blink_count
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
