const express = require('express');
const router = express.Router();
const pool = require('../db');
const { getSQLFromQuestion } = require('../services/questionParser');

router.post('/', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const sql = getSQLFromQuestion(question);

    if (!sql) {
      return res.status(400).json({ error: 'Could not understand the question.' });
    }

    const result = await pool.query(sql);
    return res.json({ answer: result.rows });

  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
