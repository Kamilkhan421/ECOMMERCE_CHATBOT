module.exports = (sequelize, DataTypes) => {
  return sequelize.define("task", {
    task_str_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estimated_time_minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed'),
      defaultValue: 'pending'
    },
    submitted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
};