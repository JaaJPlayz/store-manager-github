const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.use(express.json());

router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleById);
router.post('/sales', salesController.insertSale);

module.exports = router;
