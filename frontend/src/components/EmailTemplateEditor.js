import React, { useState } from 'react';

// Function to replace placeholders in the email template
function replacePlaceholders(template, data) {
    for (const key in data) {
        const placeholder = `{${key}}`;  // Placeholder format {Company Name}
        const value = data[key];  // Corresponding value from the CSV

        // Replace all occurrences of the placeholder with actual value
        template = template.replace(new RegExp(placeholder, 'g'), value);
    }
    return template;
}

function EmailTemplateEditor({ onTemplateSave }) {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleSaveTemplate = () => {
        onTemplateSave({ subject, body });
    };

    return (
        <div>
            <h2>Create Email Template</h2>
            <div>
                <label>Subject:</label>
                <input 
                    type="text" 
                    value={subject} 
                    onChange={handleSubjectChange} 
                    placeholder="Enter subject with placeholders like {Company Name}"
                />
            </div>
            <div>
                <label>Body:</label>
                <textarea
                    value={body}
                    onChange={handleBodyChange}
                    placeholder="Enter body with placeholders like {Company Name}"
                />
            </div>
            <button onClick={handleSaveTemplate}>Save Template</button>
        </div>
    );
}

export default EmailTemplateEditor;