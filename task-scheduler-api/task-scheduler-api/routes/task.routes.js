const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

router.post('/tasks', controller.createTask);
router.get('/tasks/:task_str_id', controller.getTaskById);
router.put('/tasks/:task_str_id/status', controller.updateTaskStatus);
router.get('/tasks/next-to-process', controller.getNextTaskToProcess);
router.get('/tasks/pending', controller.getPendingTasksSorted);

module.exports = router;