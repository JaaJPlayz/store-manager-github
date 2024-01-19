const productsModel = require('../models/products.model');

const getAllProducts = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    const exception = new Error('Product not found');
    exception.status = 400;
  }
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
