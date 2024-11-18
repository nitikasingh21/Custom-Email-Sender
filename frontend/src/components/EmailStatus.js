import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const EmailStatus = () => {
    const [statusUpdates, setStatusUpdates] = useState([]);
    const socket = io("http://127.0.0.1:5000"); // Backend URL

    useEffect(() => {
        socket.on("status_update", (data) => {
            setStatusUpdates((prevStatus) => [...prevStatus, data]);
        });

        // To cleanup socket connection
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h3>Email Sending Status</h3>
            <ul>
                {statusUpdates.map((status, index) => (
                    <li key={index}>
                        <strong>{status.email}</strong>: {status.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmailStatus;
