const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSalesMiddlewares = require('../middlewares/validateNewSale');

const router = express.Router();

router.use(express.json());

router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleById);
router.post(
  '/sales',
  validateSalesMiddlewares.validateSale,
  salesController.insertSale,
);

module.exports = router;
