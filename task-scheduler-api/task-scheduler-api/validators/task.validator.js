const Joi = require("joi");

exports.createTaskSchema = Joi.object({
  task_str_id: Joi.string().required(),
  description: Joi.string().required(),
  estimated_time_minutes: Joi.number().integer().min(1).required()
});

exports.statusUpdateSchema = Joi.object({
  new_status: Joi.string().valid("pending", "processing", "completed").required()
});