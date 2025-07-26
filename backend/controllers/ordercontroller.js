const pool = require('../db');

exports.getOrderSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) AS total_orders,
        SUM(num_of_item) AS total_items,
        COUNT(returned_at) AS returned_orders
      FROM orders
    `);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
