# import Flask
import openai
import re
import pandas as pd
import pickle
import tensorflow as tf
from tensorflow.keras import activations, optimizers, losses
from transformers import DistilBertTokenizer, TFDistilBertForSequenceClassification
from flask import Flask, request, jsonify
from flask import Flask
from flask_cors import CORS


def extract_job_details(input):


    

    # Set up the messages for the chat-based model
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f'Analyze the following job-related tweet and extract details: "{input}"'},
        {"role": "user", "content": "Extract the following information: Location, Salary Range (float), Company Profile (with minimum words), Job Description (with minimum words), Benefits, Telecommuting (yes/no), Has Company Logo (yes/no), Has Questions (yes/no), Employment Type, Fraudulent, Job Field, Requirements."}
    ]

    # Call the OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    # Extract the assistant's reply from the response
    assistant_reply = response.choices[0].message['content']

    # You can then parse the assistant's reply to extract the required fields and integrate them into a DataFrame

    # ... [Your parsing and DataFrame integration code here]

    return(assistant_reply)


def data_preprocessing(input):

    # Define regular expressions for each field
    regexes = {
        'location': r"Location: (.+?)\n",
        'salary_range': r"Salary Range: (.+?)\n",
        'company_profile': r"Company Profile: (.+?)\n",
        'description': r"Job Description: (.+?)\n",
        'benefits': r"Benefits: (.+?)\n",
        'telecommuting': r"Telecommuting: (.+?)\n",
        'has_company_logo': r"Has Company Logo: (.+?)\n",
        'has_questions': r"Has Questions: (.+?)\n",
        'employment_type': r"Employment Type: (.+?)\n",
        'job_field': r"Job Field: (.+?)\n",
        'Requirements': r"Requirements: (.+)"
    }

    # Sample data
    test_data = [input]

    # Extract data using regular expressions
    data_list = []
    for test in test_data:
        test_str = str(test)  # Convert dictionary to string
        data = {}
        for key, regex in regexes.items():
            match = re.search(regex, test_str)
            data[key] = match.group(1) if match else "Not specified"
        data_list.append(data)

    # Convert the extracted data into a DataFrame
    df = pd.DataFrame(data_list)

    # Extract the first numerical value from each row in the 'salary_range' column
    df['salary_range'] = df['salary_range'].str.extract(r"(\d+[\d,\.]*\d*)")

    # Convert the extracted values to integers
    df['salary_range'] = df['salary_range'].str.replace(',', '').astype(float).fillna(0).astype(int)

    # Fill NaN values based on the 'fraudulent' column
    df.loc[df['location'].str.contains('Not|None', case=False, na=False),'location'] = 'no available data'

    columns_to_check = ['company_profile', 'description', 'Requirements', 'benefits','job_field']

    for col in columns_to_check:
        df.loc[df[col].str.contains('Not|None', case=False, na=False), col] = 'no available data'

    df.loc[df['telecommuting'].str.contains('Yes', case=False, na=False), 'telecommuting'] = 'has telecommuting'
    df.loc[df['telecommuting'].str.contains('Not|None', case=False, na=False), 'telecommuting'] = "hasn't telecommuting"

    df.loc[df['has_company_logo'].str.contains('Yes', case=False, na=False), 'has_company_logo'] = 'has company logo'
    df.loc[df['has_company_logo'].str.contains('Not|None', case=False, na=False), 'has_company_logo'] = "hasn't company logo"

    df.loc[df['has_questions'].str.contains('Yes', case=False, na=False), 'has_questions'] = 'has questions'
    df.loc[df['has_questions'].str.contains('Not|None', case=False, na=False), 'has_questions'] = "hasn't questions"

    df.loc[df['employment_type'].str.contains('Not|None', case=False, na=False), 'employment_type'] = "other"

    df.loc[df['job_field'].str.contains('Not|None|No', case=False, na=False), 'job_field'] = "other"

    # Convert 'salary_range' column to object type
    df['salary_range'] = df['salary_range'].astype('str')

    df['text'] = df['location'] + " " + df['salary_range'] + " " + df['company_profile'] + " " + df['description'] + " " + df['benefits'] + " " + df['telecommuting'] + " " + df['has_company_logo'] + " " + df['has_questions'] + " " + df['employment_type'] + " " + df['job_field'] + " " + df['Requirements']

    return df


def detect_red_flags_gpt3_turbo(job_description):

    
    # Designing the conversation for GPT-3.5-turbo
    conversation = {
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that identifies fake and real job in job descriptions."},
            {"role": "user", "content": f"Given the job description: '{job_description}', is this contain red flags related to fake? give yes or no"}
        ]
    }

    # Getting response from GPT-3.5-turbo
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=conversation["messages"], max_tokens=150)

    # Parsing the response
    answer = response.choices[0].message['content'].strip()

    return answer.lower()

    # # Based on the response, decide if it's fake or real
    # if "yes" in answer.lower():
    #     return "Potential fake job"
    # else:
    #     return "Likely real job"

    
def construct_encodings(x, tkzr, max_len, trucation=True, padding=True):
    return tkzr(x, max_length=max_len, truncation=trucation, padding=padding)

def construct_tfdataset(encodings, y=None):
    if y:
        return tf.data.Dataset.from_tensor_slices((dict(encodings),y))
    else:
        # this case is used when making predictions on unseen samples after training
        return tf.data.Dataset.from_tensor_slices(dict(encodings))

def create_predictor(model, model_name, max_len):
    tkzr = DistilBertTokenizer.from_pretrained(model_name)
    
    def predict_proba(text):
        x = [text]

        encodings = construct_encodings(x, tkzr, max_len=max_len)
        tfdataset = construct_tfdataset(encodings)
        tfdataset = tfdataset.batch(1)

        preds = model.predict(tfdataset).logits
        preds = activations.softmax(tf.convert_to_tensor(preds)).numpy()
        return preds[0][0]
        
    return predict_proba

def classify_job(input):
    details = extract_job_details(input)
    df = data_preprocessing(details)

    loaded_model = TFDistilBertForSequenceClassification.from_pretrained("model")

    clf = create_predictor(loaded_model, 'distilbert-base-uncased', 128)

    result = clf(df['text'].iloc[0])

    if result > 0.5:
        return "Real Job :)"
    else:
        return "Fake Job :("
    



def job_cls(input_test):
    if detect_red_flags_gpt3_turbo(input_test) == 'yes':
        return("fake job")
    else:
        return classify_job(input_test)



app = Flask(__name__)

# Configure CORS to allow requests from http://localhost:3000
CORS(app, resources={r"/analyze_job": {"origins": "http://localhost:3000"}})


@app.route('/analyze_job', methods=['POST'])
def analyze_job():
    # # Get the input data from the POST request
    data = request.get_json()
    job_description = data['job_description']

    # # Run the function on the input data
    result = job_cls(job_description)

    # # Return the result as a JSON object
    # return jsonify({"result": "result"})
    return jsonify({"result": result})

    # return jsonify({'result': job_description})
    # your logic here
    # return job_description

@app.route('/')
def home():
    return "Hi there!"



if __name__ == "__main__":

    # # Initialize the OpenAI API with your API key
    # openai.api_key = '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'

    # sample_text = input("Enter the job-related tweet to be analyzed: ")


    # # print(detect_red_flags_gpt3_turbo(sample_text))

    # # print(classify_job(sample_text))
    # print(job_cls(sample_text))

 
    # openai.api_key = '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'
    # openai.api_key = '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'
    # openai.api_key = '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'
    # openai.api_key = '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'
    # openai.api_key = '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'

    # New one
    openai.api_key = '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'
    
    app.run(debug=True, port=5008)
    