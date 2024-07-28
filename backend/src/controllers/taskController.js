const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const { category, priority, status, sort } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (priority) filter.priority = priority;
        if (status === 'Completed') filter.completed = true;
        if (status === 'Incomplete') filter.completed = false;

        let tasks = await Task.find(filter);

        if (sort === 'dueDate') {
            tasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (sort === 'priority') {
            const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
            tasks = tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const task = await newTask.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.completeTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.completed = true;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
