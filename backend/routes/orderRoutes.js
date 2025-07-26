const express = require('express');
const router = express.Router();
const { getOrderSummary } = require('../controllers/ordercontroller');

router.get('/summary', getOrderSummary);

module.exports = router;
