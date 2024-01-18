const productsService = require('../services/products.service');

const getAllController = async (_req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllController,
  getByIdController,
};
