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
