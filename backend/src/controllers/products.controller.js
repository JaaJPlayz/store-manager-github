const { getAllProducts, getProductById } = require('../services/products.service');

const getAllController = async (_req, res) => {
  const products = await getAllProducts();
  res.status(products.status).json(products.data);
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  res.status(product.status).json(product.data);
};

module.exports = {
  getAllController,
  getByIdController,
};
