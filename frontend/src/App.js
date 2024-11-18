import React, { useState, useEffect } from 'react';
import './styles/App.css'; // Updated path for App.css
import EmailTemplateEditor from './components/EmailTemplateEditor';
import EmailStatus from './components/EmailStatus';
import { io } from 'socket.io-client';

function App() {
    const [emailTemplate, setEmailTemplate] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all'); // State for filtering statuses
    const [progress, setProgress] = useState(0); // State for the progress bar
    const [totalEmails, setTotalEmails] = useState(0); // Total emails to send
    const [emailsSent, setEmailsSent] = useState(0); // Number of emails sent so far
    const [emailsToSend, setEmailsToSend] = useState([]); // Emails list

    const socket = io('http://localhost:5000'); // Ensure this matches your backend URL

    // Handle template save from EmailTemplateEditor
    const handleTemplateSave = (template) => {
        setEmailTemplate(template);
    };

    // Dummy email data for testing purposes
    const emailData = [
        { email: 'user1@example.com', 'Company Name': 'Tech Corp', Location: 'New York' },
        { email: 'user2@example.com', 'Company Name': 'Biz Inc', Location: 'Los Angeles' },
    ];

    const template = emailTemplate || { subject: '', body: '' };

    // Prepare emails based on the template and data
    const emailsToSendList = emailData.map((data) => {
        const personalizedSubject = replacePlaceholders(template.subject, data);
        const personalizedBody = replacePlaceholders(template.body, data);
        return {
            email: data.email,
            subject: personalizedSubject,
            body: personalizedBody,
            status: 'pending', // Initially set status to 'pending'
        };
    });

    useEffect(() => {
        // Store emails when the template is saved
        setEmailsToSend(emailsToSendList);

        // Listen for status updates from the server
        socket.on('status_update', (data) => {
            setEmailsToSend((prevEmails) =>
                prevEmails.map((email) =>
                    email.email === data.email
                        ? { ...email, status: data.status } // Update email status
                        : email
                )
            );

            // Update progress bar
            const sentEmails =
                emailsToSend.filter((email) => email.status === 'delivered').length + 1;
            setEmailsSent(sentEmails);
            setProgress((sentEmails / totalEmails) * 100);
        });

        // Clean up the socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, [totalEmails, emailsToSendList]);

    // Function to send emails and track progress
    const sendEmails = () => {
        setTotalEmails(emailsToSendList.length);
        emailsToSendList.forEach((email, index) => {
            // Simulate email sending with a timeout to update the progress
            setTimeout(() => {
                socket.emit('status_update', {
                    email: email.email,
                    status: 'sending', // Update status as sending
                });
            }, index * 1000); // Delay sending for each email
        });
    };

    // Replace placeholders in the email content
    const replacePlaceholders = (content, data) => {
        return content.replace(/{(.*?)}/g, (_, key) => data[key.trim()] || '');
    };

    // Filter emails based on their status
    const filteredEmails = emailsToSend.filter((email) => {
        if (filterStatus === 'all') return true;
        return email.status === filterStatus;
    });

    return (
        <div className="App">
            <h1>Email Template Creator</h1>
            <EmailTemplateEditor onTemplateSave={handleTemplateSave} />
            <div>
                <h2>Generated Emails:</h2>
                <div>
                    <button onClick={sendEmails}>Start Sending Emails</button>
                </div>
                <div>
                    <h3>Progress: {progress.toFixed(2)}%</h3>
                    <progress value={progress} max={100}></progress>
                    <p>
                        {emailsSent} / {totalEmails} emails sent
                    </p>
                </div>
                <div>
                    <label>Filter by Status:</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="sending">Sending</option>
                        <option value="delivered">Delivered</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
                <div>
                    <h3>Emails to Send:</h3>
                    {filteredEmails.map((email, index) => (
                        <div key={index}>
                            <h4>{email.subject}</h4>
                            <p>{email.body}</p>
                            <p>Status: {email.status}</p>
                        </div>
                    ))}
                </div>
            </div>
            <EmailStatus /> {/* Add the EmailStatus component to show real-time updates */}
        </div>
    );
}

export default App;