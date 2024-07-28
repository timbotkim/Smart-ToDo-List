import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import { addTask, getTasks, deleteTask, completeTask } from './services/taskService';
import TaskFilterSort from './components/TaskFilterSort';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({ category: '', priority: '', status: '' });
    const [sort, setSort] = useState('');

    useEffect(() => {
        getTasks(filters, sort).then((response) => {
            setTasks(response.data);
        });
    }, [filters, sort]);

    const handleAddTask = (task) => {
        addTask(task).then((response) => {
            setTasks([...tasks, response.data]);
        });
    };

    const handleDeleteTask = (taskId) => {
        deleteTask(taskId).then(() => {
            setTasks(tasks.filter((task) => task._id !== taskId));
        });
    };

    const handleCompleteTask = (taskId) => {
        completeTask(taskId).then((response) => {
            setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
        });
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <div>
                            <TaskFilterSort setFilter={setFilters} setSort={setSort} />
                            <Dashboard tasks={tasks} addTask={handleAddTask} deleteTask={handleDeleteTask} completeTask={handleCompleteTask} />
                        </div>
                    }
                />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
};

export default App;
