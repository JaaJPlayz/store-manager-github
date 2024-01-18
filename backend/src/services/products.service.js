const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  return { status: 200, data: products };
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  return { status: 200, data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};
