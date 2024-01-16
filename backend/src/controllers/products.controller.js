const { getAllProducts, getProductById } = require('../services/products.service');

const getAllController = async (_req, res) => {
  const products = await getAllProducts();
  res.status(200).json(products);
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  res.status(200).json(product);
};

module.exports = {
  getAllController,
  getByIdController,
};
