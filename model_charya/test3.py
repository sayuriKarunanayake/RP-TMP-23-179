import requests

# Define the URL where your Flask app is hosted
url = 'http://192.168.8.100:5004/predict'  # Replace with the actual URL where your app is hosted

# Define the input data as a dictionary
input_data = {
    'Experience': 1.5,  # Replace with the value for your first input variable
    'Job_Lev': 'Senior'  # Replace with the value for your second input variable
}

# Send a POST request to the URL with the input data
response = requests.post(url, json=input_data)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response to get the predictions
    data = response.json()
    predictions = data.get('prediction')
    print('Predictions:', predictions)
else:
    print('Error:', response.text)
