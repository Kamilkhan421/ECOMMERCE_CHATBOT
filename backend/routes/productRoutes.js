const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getTopReturnedProducts,
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/top-returned', getTopReturnedProducts);

module.exports = router;
