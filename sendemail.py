import time
import schedule
import logging
import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content
import csv
import random

# Email sending function using SendGrid
def send_email_via_sendgrid(recipient, subject, body):
    sg = sendgrid.SendGridAPIClient(api_key='your_api_key')
    from_email = Email("your_email@example.com")  # Sender's email
    to_email = To(recipient)  # Recipient's email
    content = Content("text/plain", body)  # Email content (Main body)
    
    mail = Mail(from_email, to_email, subject, content)
    
    try:
        response = sg.send(mail)
        if response.status_code == 202:
            logging.info(f"Email sent successfully to {recipient}")
        else:
            logging.error(f"Failed to send email to {recipient}. Status code: {response.status_code}")
    except Exception as e:
        logging.error(f"Error sending email to {recipient}: {e}")

# Retry function with exponential backoff
def send_email_via_sendgrid_with_retry(recipient, subject, body, retries=3):
    for attempt in range(retries):
        try:
            send_email_via_sendgrid(recipient, subject, body)
            break
        except Exception as e:
            if attempt < retries - 1:
                wait_time = 2 ** attempt + random.uniform(0, 1)
                print(f"Retrying in {wait_time:.2f} seconds...")
                time.sleep(wait_time)
            else:
                logging.error(f"Failed to send email after {retries} attempts.")

# Dynamic throttling variables
email_count = 0
email_limit = 100  # Max emails per hour
reset_interval = 3600  # 1 hour in seconds

# Function to reset the email count every hour
def reset_email_count():
    global email_count
    email_count = 0
    print("Email count reset.")

schedule.every(reset_interval).seconds.do(reset_email_count)

# Function to send emails with throttling logic
def send_email_with_throttling(recipient, subject, body):
    global email_count
    
    # Checking if email limit has been reached
    if email_count >= email_limit:
        print(f"Email limit reached. Waiting for {reset_interval // 60} minutes...")
        time.sleep(reset_interval)  # Wait until the reset
        email_count = 0  # Reset email count after waiting

    # Sending email via SendGrid with retry logic
    send_email_via_sendgrid_with_retry(recipient, subject, body)
    email_count += 1  # Increment email count

# Function to read email data from CSV file
def read_email_data_from_csv(csv_file):
    email_data = []
    with open(csv_file, mode='r', newline='') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)
        for row in csv_reader:
            email_data.append((row[0], row[1], row[2]))
    return email_data

csv_file = r'C:\Users\LENOVO\OneDrive\Desktop\Custom Email Sender\recipients.csv'
email_data = read_email_data_from_csv(csv_file)

# Example scheduling logic
def schedule_emails(email_data):
    for recipient, subject, body in email_data:
        schedule.every(10).seconds.do(send_email_with_throttling, recipient, subject, body)

    while True:
        schedule.run_pending()
        time.sleep(1)

schedule_emails(email_data)
