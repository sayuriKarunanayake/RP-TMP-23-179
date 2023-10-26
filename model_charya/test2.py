from datetime import datetime

time_periods = [
    "April 2022 - Present",
    "December 2020 - Present",
    "June 2019 - December 2020",
    "March 2017 - September 2017",
]

def calculate_duration_in_years(time_period):
    # Split the time period into start and end parts
    start, end = time_period.split(" - ")

    # Define a dictionary to map month names to month numbers
    month_mapping = {
        "January": 1, "February": 2, "March": 3, "April": 4,
        "May": 5, "June": 6, "July": 7, "August": 8,
        "September": 9, "October": 10, "November": 11, "December": 12
    }

    # Extract the month and year components of the start date
    start_month, start_year = start.split()

    # Initialize end_month and end_year
    end_month, end_year = "Present", datetime.now().year

    # If the end date is not "Present," extract its components
    if end != "Present":
        end_month, end_year = end.split()
    else:
        # If the end date is "Present," use the current month and year
        now = datetime.now()
        end_month = now.strftime('%B')
        end_year = now.year

    # Convert month names to month numbers
    start_month = month_mapping[start_month]
    end_month = month_mapping.get(end_month, None)
    print(end_month)

    if end_month is None:
        # Handle cases where the month is not recognized
        return "Invalid Month in End Date"
    
    # Calculate the duration in years
    start_date = datetime(int(start_year), start_month, 1)
    end_date = datetime(int(end_year), end_month, 1)
    duration = (end_date - start_date).days / 365.0

    return duration

# Calculate the duration in years for each time period
for time_period in time_periods:
    duration = calculate_duration_in_years(time_period)
    print(time_period, duration)
