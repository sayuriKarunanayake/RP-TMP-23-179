from flask import Flask, request, jsonify
import PyPDF2
import re
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Function to extract text from a PDF file using PyPDF2
def extract_text_from_pdf(pdf_file):
    text = ""
    pdf = PyPDF2.PdfReader(pdf_file)

    # Loop through each page and extract text
    for page_num in range(len(pdf.pages)):
        page = pdf.pages[page_num]
        text += page.extract_text()

    return text

# Function to extract time periods from the "Experience" section
def extract_experience_time_periods(text):
    # Define a regular expression pattern to match time periods (e.g., "Month Year - Month Year")
    experience_education_pattern = r'Experience(.*?)Education'
    time_period_pattern = r'\w+\s\d{4}\s-\s(?:Present|\w+\s\d{4})'

    experience_education_match = re.search(experience_education_pattern, text, re.DOTALL)
    if experience_education_match:
        experience_education_text = experience_education_match.group(1)
        time_periods = re.findall(time_period_pattern, experience_education_text)

    return time_periods

# Function to calculate the duration in years for each time period
def calculate_duration_in_years(time_periods):
    total_durations = []

    lines = time_periods.strip().split('\n')

    # Skip the first line as it contains the header
    for line in lines:
        start, end = line.strip().split("\xa0-\xa0")

        # Define a dictionary to map month names to month numbers
        month_mapping = {
            "January": 1, "February": 2, "March": 3, "April": 4,
            "May": 5, "June": 6, "July": 7, "August": 8,
            "September": 9, "October": 10, "November": 11, "December": 12
        }

        # Extract the month and year components of the start date
        start_month, start_year = start.split()
        start_month = month_mapping[start_month]

        # Initialize end_month and end_year
        end_month, end_year = "Present", datetime.now().year

        # If the end date is not "Present," extract its components
        if end != "Present":
            end_month, end_year = end.split()
            end_month = month_mapping[end_month]
        
        else:
            # If the end date is "Present," use the current month and year
            now = datetime.now()
            end_month = now.strftime('%B')
            end_year = now.year
            end_month = month_mapping.get(end_month, None)

        # Calculate the duration in years
        start_date = datetime(int(start_year), start_month, 1)
        end_date = datetime(int(end_year), end_month, 1)
        duration = (end_date - start_date).days / 365.0

        total_durations.append(duration)

    return total_durations


# Function to calculate the total duration in years for all time periods
def calculate_total_duration(time_periods):
    total_durations = []

    for time_period in time_periods:
        duration = calculate_duration_in_years(time_period)
        total_durations.append(duration)

    # Flatten the list of lists
    flattened_durations = [item for sublist in total_durations for item in sublist]

    # Calculate the total sum
    total_duration = sum(flattened_durations)
    rounded_duration = round(total_duration, 1)

    return rounded_duration

# Define a route for PDF text extraction and duration calculation
@app.route('/extract_experience_time_durations', methods=['POST'])
def extract_experience_time_durations_route():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No PDF file provided'})

    pdf_file = request.files['pdf']
    extracted_text = extract_text_from_pdf(pdf_file)
    time_periods = extract_experience_time_periods(extracted_text)
    total_durations = calculate_total_duration(time_periods)

    return jsonify({'experience_time_durations': total_durations})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
