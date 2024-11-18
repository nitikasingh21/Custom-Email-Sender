from flask import Flask, render_template, request, redirect, url_for
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import time

app = Flask(__name__)

# Store email connection details
connected_email = None
connected_password = None

# Global list to store email logs
email_logs = []

# Initialize scheduler
scheduler = BackgroundScheduler()
scheduler.start()

@app.route('/')
def home():
    return render_template('connect_email.html')

@app.route('/connect', methods=['POST'])
def connect_email():
    global connected_email, connected_password
    connected_email = request.form['email']
    connected_password = request.form['password']
    return "Email account connected successfully!"

@app.route('/customize', methods=['GET', 'POST'])
def customize_email():
    if request.method == 'POST':
        to_email = request.form['to_email']
        subject = request.form['subject']
        body = request.form['body']
        schedule_time = request.form['schedule_time']

        # Parse the scheduled time to datetime object
        scheduled_time = datetime.strptime(schedule_time, "%Y-%m-%d %H:%M:%S")

        # Schedule the email
        scheduler.add_job(send_email, 'date', run_date=scheduled_time, args=[to_email, subject, body])

        # Log the scheduled email
        email_logs.append({'to_email': to_email, 'subject': subject, 'status': 'Scheduled', 'timestamp': str(scheduled_time)})

        return redirect(url_for('view_status'))
    return render_template('customize_email.html')

def send_email(to_email, subject, body):
    global connected_email, connected_password
    try:
        msg = MIMEMultipart()
        msg['From'] = connected_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(connected_email, connected_password)
            server.sendmail(connected_email, to_email, msg.as_string())
        email_logs.append({'to_email': to_email, 'subject': subject, 'status': 'Sent', 'timestamp': str(datetime.now())})
    except Exception as e:
        print(f"Error: {e}")
        email_logs.append({'to_email': to_email, 'subject': subject, 'status': 'Failed', 'timestamp': str(datetime.now())})

@app.route('/status')
def view_status():
    return render_template('email_status.html', logs=email_logs)

if __name__ == '__main__':
    app.run(debug=True)