from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")  # Ensure eventlet is used

@app.route("/send_email", methods=["POST"])
def send_email():
    data = request.json
    email = data.get("email")
    subject = data.get("subject")
    body = data.get("body")

    # Simulate email sending
    socketio.emit("status_update", {"email": email, "status": "Sending email..."})
    time.sleep(2)  # Simulating delay
    socketio.emit("status_update", {"email": email, "status": "Email delivered"})
    
    return jsonify({"message": "Email sent successfully"}), 200

if __name__ == "__main__":
    socketio.run(app, debug=True)