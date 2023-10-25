from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import seaborn as sns
import numpy as np #for graph
import pickle

# Read the dataset from a CSV file
dataset = pd.read_csv('datasetTt2.csv')

# Use only the 'skills' column as the feature
features = dataset['Keywords']

# Use the 'Ad title' column as the labels
labels = dataset['Ad title']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# Initialize the TF-IDF vectorizer
vectorizer = TfidfVectorizer()

# Save the array to a file
with open('X_train.pickle', 'wb') as file:
    pickle.dump(X_train, file)


Ad_title = labels.to_numpy()

np.save("Ad_title.npy",Ad_title)