# Custom Email Sender

A customizable email sender web application that allows users to create email templates, schedule emails, track email statuses, and monitor sending progress via a user-friendly dashboard. The backend uses Flask, and the frontend is built with React.js.

## Features
- **Email Template Creation**: Create customizable email templates with placeholders.
- **Email Scheduling**: Schedule emails and track progress.
- **Status Tracking**: Real-time email status updates (sending, delivered, failed).
- **Email Analytics**: View email sending progress and filter emails by status.

## Project Structure

custom-email-sender/ │ ├── backend/ # Backend folder (Flask API) │ ├── app.py # Main app file for Flask backend │ ├── .env # Stores environment variables (NOT uploaded to GitHub) │ └── requirements.txt # Lists required Python dependencies │ ├── frontend/ # Frontend folder (React.js app) │ ├── src/ # Source folder for React components │ │ ├── components/ # React components (EmailTemplateEditor, EmailStatus) │ │ └── App.js # Main React file │ ├── public/ # Public files (index.html, etc.) │ ├── package.json # Lists required Node.js dependencies │ └── .gitignore # Git ignore file to exclude sensitive files │ ├── templates/ # Folder for email templates (HTML/CSS) │ └── sampleTemplate.html # Example template │ ├── .gitignore # Git ignore file for excluding unwanted files (like .env) ├── README.md # Project documentation


## Setup and Configuration Instructions

Follow these steps to set up the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/custom-email-sender.git
cd custom-email-sender
