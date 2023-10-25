from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import seaborn as sns
import numpy as np #for graph
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('X_train.pickle', 'rb') as file:
    X_train = pickle.load(file)

# Ad_title = np.load('Ad_title.npy',allow_pickle=True)
df = pd.read_csv('datasetTt2.csv')

# Initialize the TF-IDF vectorizer
vectorizer = TfidfVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)


@app.route('/recommend', methods=['POST'])
def index():
    
    try:
       user_input = request.json.get('user_skills')
       user_skills = [user_input]
           
       # Transform user input
       user_skills_vectorized = vectorizer.transform(user_skills)

       # Calculate cosine similarity between user input and training data
       similarity_scores = cosine_similarity(user_skills_vectorized, X_train_vectorized)

       # Get the index of the job title with the highest similarity score
       best_index = similarity_scores.argmax()

       #Get top recommendations based on similarity scores
       top_k = 5  # Number of recommendations to show
       top_indices = similarity_scores[0].argsort()[::-1][:top_k]

       recommendations = []
       for index in top_indices:
                 recommended_job_title = df['Ad title'].iloc[index]
                 similarity_score = similarity_scores[0][index]
                 recommendations.append({
                    'title': recommended_job_title,
                    'score': similarity_score
                 })

       return jsonify({'recommendations': recommendations})
    except Exception as e:
        return jsonify({'error':str(e)}), 400

if __name__== '__main__':
    app.run(host='0.0.0.0',port=5000)