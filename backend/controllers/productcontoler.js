const pool = require('../db');

exports.getAllProducts = async (req, res) => {
  try {
    const { category, brand, limit = 10 } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    if (brand) {
      params.push(brand);
      query += ` AND brand = $${params.length}`;
    }

    query += ` LIMIT $${params.length + 1}`;
    params.push(limit);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTopReturnedProducts = async (req, res) => {
  try {
    const query = `
      SELECT p.name, COUNT(*) AS return_count
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      WHERE oi.returned_at IS NOT NULL
      GROUP BY p.name
      ORDER BY return_count DESC
      LIMIT 5
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
