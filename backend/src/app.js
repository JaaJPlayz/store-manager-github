const express = require('express');

const productsRouter = require('./routes/products.router');
const salesRouter = require('./routes/sales.router');

const app = express();
app.use(express.json());
app.use(productsRouter);
app.use(salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_req, res) => {
  res.json({ status: 'Store Manager UP!' });
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

module.exports = app;
