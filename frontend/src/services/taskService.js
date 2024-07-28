import axios from 'axios';

const API_URL = 'http://localhost:5002/api/tasks';

const addTask = (task) => {
    return axios.post(API_URL, task);
};

const getTasks = (filters, sort) => {
    return axios.get(API_URL, { params: { ...filters, sort } });
};

const deleteTask = (taskId) => {
    return axios.delete(`${API_URL}/${taskId}`);
};

const completeTask = (taskId) => {
    return axios.put(`${API_URL}/${taskId}/complete`);
};

const editTask = (taskId, updatedTask) => {
    return axios.put(`${API_URL}/${taskId}`, updatedTask);
};

export { addTask, getTasks, deleteTask, completeTask, editTask };
