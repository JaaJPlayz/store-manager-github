const productsService = require('../services/products.service');

const getAllController = async (_req, res) => {
  const results = await productsService.getAllProducts();
  res.status(200).json(results);
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
  if (!name || name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  const newProduct = await productsService.insertNewProduct(name);
  res.status(201).json(newProduct);
};

const idExistsValidator = (id) => !id || id === undefined;

const nameExistsValidator = (name) => !name || name === undefined;

const updateProductName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (idExistsValidator(id)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (nameExistsValidator(name)) {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    const updatedProduct = await productsService.updateProductName(id, name);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    if (idExistsValidator(id)) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productsService.removeProduct(id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllController,
  getByIdController,
  insertNewProduct,
  updateProductName,
  deleteProductController,
};
