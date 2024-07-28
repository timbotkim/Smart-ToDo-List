const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: Date, required: false },
    priority: { type: String, required: true },
    category: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', TaskSchema);
