const { getAll, findById } = require('../models/products.model');

const getAllProducts = async () => {
  const products = await getAll();
  return { status: 200, data: products };
};

const getProductById = async (id) => {
  const product = await findById(id);
  if (!product) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  return { status: 200, data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};
