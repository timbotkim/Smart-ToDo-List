import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from 'axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from API
        axios.get('http://localhost:5002/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const addTask = (task) => {
        axios.post('http://localhost:5002/api/tasks', task)
            .then(response => setTasks([...tasks, response.data]))
            .catch(error => console.error('Error adding task:', error));
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5002/api/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(error => console.error('Error deleting task:', error));
    };

    const completeTask = (id) => {
        axios.put(`http://localhost:5002/api/tasks/${id}/complete`)
            .then(response => {
                const updatedTasks = tasks.map(task =>
                    task._id === id ? response.data : task
                );
                setTasks(updatedTasks);
            })
            .catch(error => console.error('Error completing task:', error));
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} />
        </div>
    );
};

export default Dashboard;
