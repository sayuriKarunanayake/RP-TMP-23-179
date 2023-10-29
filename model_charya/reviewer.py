import numpy as np
import pandas as pd 
import matplotlib.pyplot as plt

df = pd.read_csv('Data.csv')

# Shuffle the rows
shuffled_df = df.sample(frac=1, random_state=42)

# Reset the index of the shuffled DataFrame
shuffled_df.reset_index(drop=True, inplace=True)

from sklearn.model_selection import train_test_split

# Specify the features (X) and the target (y) column
X = df[['Experience', 'Job_Lev']]  # Replace 'target_column_name' with the actual column name
y = df['Final']

# Split the data into training and testing sets (e.g., 80% for training, 20% for testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# Define a Sequential model
model = keras.Sequential()

# Add input layer
model.add(layers.Input(shape=(2,)))  # 2 feature variables

# Add one or more hidden layers (customize these as needed)
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(32, activation='relu'))

num_classes = 2
# Add output layer with the appropriate number of classes (replace 'num_classes')
model.add(layers.Dense(num_classes, activation='softmax'))

# Compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=10, batch_size=32)

from tensorflow import keras

# Assuming 'model' is your Keras neural network model
model.save('Reviewer.h5')