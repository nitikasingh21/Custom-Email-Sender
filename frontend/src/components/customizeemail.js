import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CustomizeEmail() {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toEmail, subject, body, scheduleTime }),
    });
    if (response.ok) {
      alert("Email scheduled successfully!");
      history.push("/status");
    } else {
      alert("Failed to schedule email!");
    }
  };

  return (
    <div>
      <h2>Customize Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Recipient Email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          required
        />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}

export default CustomizeEmail;