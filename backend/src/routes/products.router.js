const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.use(express.json());

router.get('/products', productsController.getAllController);
router.get('/products/:id', productsController.getByIdController);
router.post('/products', productsController.insertNewProduct);
router.put('/products/:id', productsController.updateProductName);
router.delete('/products/:id', productsController.deleteProductController);

module.exports = router;