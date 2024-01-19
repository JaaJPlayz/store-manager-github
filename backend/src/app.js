const express = require('express');

const productsRouter = require('./routes/products.router');

const app = express();
app.use(express.json());
app.use(productsRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_req, res) => {
  res.json({ status: 'Store Manager UP!' });
});

app.use('/', productsRouter);
// app.get('/sales', async (req, res) => {
//   const apiResponse = await salesController.getAllSalesController;
//   res.status(200).json(apiResponse);
// });

// app.get('/sales/:id', async (req, res) => {
//   const apiResponse = await salesController.getByIdSalesController;
//   res.status(200).json(apiResponse);
// });

module.exports = app;
