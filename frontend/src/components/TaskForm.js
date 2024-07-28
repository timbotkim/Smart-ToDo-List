import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('Other');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title, dueDate, priority, category });
        setTitle('');
        setDueDate('');
        setPriority('Medium');
        setCategory('Other');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
