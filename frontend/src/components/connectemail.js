import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ConnectEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      alert("Email connected successfully!");
      history.push("/customize");
    } else {
      alert("Failed to connect email!");
    }
  };

  return (
    <div>
      <h2>Connect Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Connect</button>
      </form>
    </div>
  );
}

export default ConnectEmail;