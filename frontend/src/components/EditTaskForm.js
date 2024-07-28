import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTaskForm = ({ taskId, onClose }) => {
    const [task, setTask] = useState({ title: '', dueDate: '', priority: 'Medium', category: 'Other' });

    useEffect(() => {
        axios.get(`http://localhost:5002/api/tasks/${taskId}`)
            .then(response => setTask(response.data))
            .catch(error => console.error(error));
    }, [taskId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5002/api/tasks/${taskId}`, task)
            .then(() => {
                onClose();
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
            />
            <input
                type="date"
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />
            <select value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select value={task.category} onChange={(e) => setTask({ ...task, category: e.target.value })}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
            </select>
            <button type="submit">Save</button>
        </form>
    );
};

export default EditTaskForm;
