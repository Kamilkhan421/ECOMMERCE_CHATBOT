function getSQLFromQuestion(question) {
  question = question.toLowerCase();

  if (question.includes('most returned')) {
    return `
      SELECT product_id, COUNT(*) AS return_count
      FROM order_items
      WHERE returned_at IS NOT NULL
      GROUP BY product_id
      ORDER BY return_count DESC
      LIMIT 5
    `;
  }

  if (question.includes('total users')) {
    return `SELECT COUNT(*) FROM users`;
  }

  if (question.includes('top selling')) {
    return `
      SELECT product_id, COUNT(*) AS sold_count
      FROM order_items
      WHERE status = 'delivered'
      GROUP BY product_id
      ORDER BY sold_count DESC
      LIMIT 5
    `;
  }

  // Add more questions as needed
  return null;
}

module.exports = { getSQLFromQuestion };
// utils/questionParser.js
const axios = require('axios');

async function parseQuestionWithLLM(question) {
  try {
    const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant who transforms natural language into SQL queries or instructions to fetch from a MySQL database.',
        },
        {
          role: 'user',
          content: `Question: "${question}". Generate a SQL or explain what data to fetch.`,
        },
      ],
    }, {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('LLM Error:', err.response?.data || err.message);
    return 'Failed to parse question using LLM.';
  }
}

module.exports = { parseQuestionWithLLM };
