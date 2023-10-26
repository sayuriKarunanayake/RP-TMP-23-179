import requests

# Define the URL of your Flask API endpoint
api_url = 'http://192.168.8.100:5003/extract_experience_time_durations'  # Update with your actual URL

# Create a dictionary with the file data to be sent
files = {'pdf': ('CV_32.pdf', open('CV_32.pdf', 'rb'))}  # Replace 'your_cv.pdf' with your PDF file path

# Send a POST request to the API
response = requests.post(api_url, files=files)

# Check if the request was successful
if response.status_code == 200:
    data = response.json()
    experience_time_durations = data.get('experience_time_durations')
    print("Experience Time Durations:")

    # Check if experience_time_durations is a list
    if isinstance(experience_time_durations, list):
        for duration in experience_time_durations:
            print(duration)
    else:
        # Handle the case where experience_time_durations is a single float value
        print(experience_time_durations)
else:
    print(f"Request failed with status code: {response.status_code}")
