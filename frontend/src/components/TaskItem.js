import React from 'react';

const TaskItem = ({ task, deleteTask, completeTask }) => {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Category: {task.category}</p>
            <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
            <button onClick={() => completeTask(task._id)}>Complete</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
    );
};

export default TaskItem;

