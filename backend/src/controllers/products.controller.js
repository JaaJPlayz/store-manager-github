const productsService = require('../services/products.service');

const getAllController = async (_req, res) => {
  try {
    const results = await productsService.getAllProducts();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productsService.getProductById(id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const insertNewProduct = async (req, res) => {
  const { name } = req.body;
  try {
    const newProduct = await productsService.insertNewProduct(name);
    if (name === '') {
      return res.status(422).json({ message: 'Product name is required' });
    }
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllController,
  getByIdController,
  insertNewProduct,
};
