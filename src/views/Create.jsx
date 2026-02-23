import React, { useState } from 'react';

export default function Create() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = () => {
        if (!title || !date) {
            alert("Title and date are required.");
            return;
        }
        const newEvent = { title, date, description };
        const existing = JSON.parse(localStorage.getItem("events") || "[]");
        existing.push(newEvent);
        localStorage.setItem("events", JSON.stringify(existing));
        setTitle("");
        setDate("");
        setDescription("");
        alert("Event saved!");
    };

    return (
        <>
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type="date"
                placeholder="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <textarea
                placeholder="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
        </>
    );
}