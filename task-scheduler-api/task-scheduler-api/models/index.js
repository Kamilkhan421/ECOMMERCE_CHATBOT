const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');
const TaskModel = require('./task.model');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Task = TaskModel(sequelize, Sequelize);

module.exports = db;