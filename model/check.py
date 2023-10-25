import requests

# Define the URL of your Flask API
api_url = 'http://127.0.0.1:5000/recommend'

# Define the user's skills as a comma-separated string
user_skills = 'node js, angular, express js'

# Create a dictionary containing the user's skills
data = {'user_skills': user_skills} 

# Send a POST request to the API
response = requests.post(api_url, json=data)

# Check the response status code
if response.status_code == 200:
    # Parse the JSON response and extract recommendations
    recommendations = response.json().get('recommendations', [])
    print("Recommended Job Titles:")
    if recommendations:
        for rec in recommendations:
            title = rec['title']
            score = rec['score']
            print(f"{title} (Similarity Score: {score:.2f})")
    else:
        print("No recommendations found.")
else:
    print(f"Error: {response.status_code}")