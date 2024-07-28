const express = require('express');
const router = express.Router();
const { getTasks, addTask, deleteTask, completeTask, updateTask } = require('../controllers/taskController');

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', deleteTask);
router.put('/:id/complete', completeTask);
router.put('/:id', updateTask);

module.exports = router;
