const db = require('../models');
const { createTaskSchema, statusUpdateSchema } = require('../validators/task.validator');
const Task = db.Task;

exports.createTask = async (req, res) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const task = await Task.create(req.body);
    return res.json({
      internal_db_id: task.id,
      task_str_id: task.task_str_id,
      status: task.status
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findOne({ where: { task_str_id: req.params.task_str_id } });
  if (!task) return res.status(404).json({ error: "Task not found" });
  return res.json(task);
};

exports.updateTaskStatus = async (req, res) => {
  const { error } = statusUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const task = await Task.findOne({ where: { task_str_id: req.params.task_str_id } });
  if (!task) return res.status(404).json({ error: "Task not found" });

  const current = task.status;
  const next = req.body.new_status;

  const isInvalid = (current === 'completed' && next !== 'completed') ||
                    (current === 'processing' && next === 'pending');

  if (isInvalid) return res.status(400).json({ error: "Invalid status transition" });

  task.status = next;
  await task.save();
  return res.json(task);
};

exports.getNextTaskToProcess = async (_, res) => {
  const task = await Task.findOne({
    where: { status: 'pending' },
    order: [['estimated_time_minutes', 'ASC'], ['submitted_at', 'ASC']]
  });
  if (!task) return res.status(404).json({ error: "No pending tasks" });
  return res.json(task);
};

exports.getPendingTasksSorted = async (req, res) => {
  const sort_by = req.query.sort_by === 'time' ? 'estimated_time_minutes' : 'submitted_at';
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
  const limit = parseInt(req.query.limit) || 10;

  const tasks = await Task.findAll({
    where: { status: 'pending' },
    order: [[sort_by, order]],
    limit
  });

  return res.json(tasks);
};