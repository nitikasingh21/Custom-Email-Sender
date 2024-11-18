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
```
### 2. Set up the backend
- Navigate to the backend folder and install the required Python dependencies using pip:

```bash
cd backend
pip install -r requirements.txt
```
- In the backend folder, create a .env file.

  ```bash    
  EMAIL_API_KEY=your_email_api_key_here
  EMAIL_ID=your_email_address_here
  EMAIL_PASSWORD=your_email_password_here
  ```
### 3. Set up the frontend
-  Install Node.js dependencies
      ```bash    
    cd frontend
    npm install
    ```
-  Start the React development server
  ```bash    
    npm start
   ```
### 4. Start the backend server
  ```bash    
    python app.py
   ```
The Flask server will run at http://localhost:5000.

### 5. Access the app
Once both the frontend and backend servers are running, open your browser and navigate to:
  ```bash    
    http://localhost:3003
   ```
This will display the email sender dashboard, where you can create email templates, schedule emails, and track their progress.

## Usage Instructions

### 1. Create an Email Template

- On the dashboard, you can create and save an email template. The template can include placeholders such as `{Company Name}`, `{Location}`, etc.
- Once you save the template, it will be used to generate personalized emails.

### 2. Schedule Emails

- Click the "Start Sending Emails" button to begin sending emails.
- The app will send the emails based on the saved template, replacing placeholders with the data provided.

### 3. Track Email Status

- As emails are being sent, the app will update their status in real-time (e.g., `sending`, `delivered`, `failed`).
- You can filter emails by status to view only those in a particular state.

### 4. Progress Bar

- The app will display a progress bar showing the percentage of emails sent.
- It will also display the number of emails sent out of the total.

## Configuration for Email Scheduling and Throttling

- The backend is set up to handle email scheduling using a socket connection. Emails are sent with a delay (1 second between each email) to avoid overwhelming the email server.
- You can adjust the delay or add more complex scheduling logic as per your requirements.

## Testing

To test the functionality:

* Create a template, schedule emails, and monitor their statuses.
* Ensure the app tracks the sending status and progress accurately.
* Check the console for any errors during email sending and address them.

## Contribution Guidelines
Feel free to fork the repository, submit pull requests, and report issues.

## License
This project is licensed under the MIT License.
