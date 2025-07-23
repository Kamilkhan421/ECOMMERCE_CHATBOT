CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  task_str_id VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  estimated_time_minutes INTEGER NOT NULL CHECK (estimated_time_minutes > 0),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);