from flask import Flask, request, jsonify
from tensorflow import keras
import numpy as np
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Load your pre-trained Keras model
model = keras.models.load_model('Reviewer.h5')  # Replace with your model filename

# Mapping of textual values to numerical codes for the "Job_Lev" input
job_lev_mapping = {
    'Intern': 0,
    'Associate': 1,
    'Mid level': 2,
    'Senior': 3,
    'Trainee': 4
}


# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the data from the request in JSON format
        data = request.get_json()

        # Extract the input variables from the JSON data
        experience = data.get('Experience')
        job_lev_text = data.get('Job_Lev')

        # Map the textual "Job_Lev" value to a numerical code
        job_lev = job_lev_mapping.get(job_lev_text, -1)  # Assign a default value if the mapping is missing

        if job_lev == -1:
            return jsonify({"error": "Invalid Job_Lev value"})

        # Make predictions using the loaded model
        input_data = np.array([[experience, job_lev]])
        predictions = model.predict(input_data)

        # Convert the prediction to a list
        results = predictions.tolist()

        class_index = results[0].index(max(results[0]))

        return jsonify({'prediction': class_index})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004)
