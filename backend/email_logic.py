from flask_socketio import SocketIO
from flask import Flask
from datetime import datetime
import random  # Simulate statuses for now

app = Flask(__name__)
socketio = SocketIO(app)

# Example email logs
email_logs = []

def send_email(to_email, subject, body):
    global email_logs
    try:
        # Simulate sending email
        status = random.choice(['Delivered', 'Opened', 'Failed'])  # Replace with real SMTP integration later
        email_logs.append({'to_email': to_email, 'subject': subject, 'status': status, 'timestamp': str(datetime.now())})
        socketio.emit('update_status', {'email': to_email, 'status': status}, broadcast=True)
    except Exception as e:
        print(f"Error: {e}")
        email_logs.append({'to_email': to_email, 'subject': subject, 'status': 'Failed', 'timestamp': str(datetime.now())})

@app.route('/logs')
def get_logs():
    return {'logs': email_logs}

if __name__ == "__main__":
    socketio.run(app, debug=True)