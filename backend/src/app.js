const express = require('express');
const { getAllController, getByIdController } = require('./controllers/products.controller');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_req, res) => {
  res.json({ status: 'Store Manager UP!' });
});

app.get('/products', (req, res) => {
  const apiResponse = getAllController(req, res);
  res.status(200).json(apiResponse);
});

app.get('/products/:id', (req, res) => {
  const apiResponse = getByIdController(req, res);
  res.status(200).json(apiResponse);
});

module.exports = app;
