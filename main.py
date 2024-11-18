from sendemail import schedule_emails
if __name__ == "__main__":
    # Specify the path to your CSV file
    csv_file_path = 'recepients.csv'
    schedule_emails(csv_file_path)