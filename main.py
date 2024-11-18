from sendemail import schedule_emails
if __name__ == "__main__":
    csv_file_path = 'recepients.csv'
    schedule_emails(csv_file_path)
