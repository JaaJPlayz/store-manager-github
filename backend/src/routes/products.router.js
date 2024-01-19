const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.use(express.json());

router.get('/products', productsController.getAllController);
router.get('/products/:id', productsController.getByIdController);

module.exports = router;