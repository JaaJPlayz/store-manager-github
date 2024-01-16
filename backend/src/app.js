const express = require('express');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', (_request, response) => {
  response.status(200).send('rota para devolver produtos');
});

app.get('/products/:id', (_request, response) => {
  response.status(200).send('rota para pegar um produto pelo id');
});

module.exports = app;
