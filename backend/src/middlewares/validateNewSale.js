const Joi = require('joi');
const productsModel = require('../models/products.model');

const schema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

const checkIfProductExist = async (productId, res) => {
  const product = await productsModel.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const handleError = (errorMessage, res) => {
  const productError = errorMessage.includes('"productId" is required');
  const quantityError = errorMessage.includes('"quantity" is required');

  if (productError || quantityError) {
    return res.status(400).json({ message: errorMessage });
  }

  if (errorMessage.includes('"quantity" must be greater than or equal to 1')) {
    return res.status(422).json({ message: errorMessage });
  }
};

const validateItem = async (item, res) => {
  const { error } = schema.validate(item);

  if (error) {
    const errorMessage = error.details[0].message;
    const errorResponse = handleError(errorMessage, res);
    if (errorResponse) return errorResponse;
  }

  const productResponse = await checkIfProductExist(item.productId, res);
  if (productResponse) return productResponse;
};

const validateSale = async (req, res, next) => {
  const itemsSold = req.body;

  const promises = itemsSold.map((item) => validateItem(item, res));

  const results = await Promise.all(promises);

  const errorResponse = results.find((result) => result);
  if (errorResponse) return errorResponse;

  next();
};

const quantitySchema = Joi.object({
  quantity: Joi.number().min(1).required(),
});

const validateSalesProductQuantity = async (req, res, next) => {
  const { quantity } = req.body;

  const { error } = quantitySchema.validate({ quantity });

  if (error) {
    const errorMessage = error.details[0].message;

    if (errorMessage.includes('"quantity" is required')) {
      return res.status(400).json({ message: errorMessage });
    }

    if (errorMessage.includes('"quantity" must be greater than or equal to 1')) {
      return res.status(422).json({ message: errorMessage });
    }

    return res.status(400).json({ message: errorMessage });
  }
  next();
};

module.exports = { validateSale, validateSalesProductQuantity };