const express = require('express');
const app = express();
require('dotenv').config();

const db = require('./models');
const taskRoutes = require('./routes/task.routes');

app.use(express.json());
app.use('/', taskRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});