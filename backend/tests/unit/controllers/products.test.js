const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { expect } = chai;

const productsService = require('../../../src/services/products.service');

const { FIRST_PRODUCT_MOCK, MOCK_PRODUCTS } = require('../mocks/products.mock');

chai.use(chaiHttp);

describe('Products Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve ser possível listar todos os produtos', async function () {
    const stub = sinon.stub(productsService, 'getAllProducts').resolves(MOCK_PRODUCTS);

    const { body } = await chai.request('http://localhost:3001').get('/products');

    expect(body).to.be.deep.equal(MOCK_PRODUCTS);
    stub.restore();
  });

  it('Deve ser possível pegar um produto pelo id', async function () {
    const stub = sinon.stub(productsService, 'getProductById').resolves(MOCK_PRODUCTS[0]);
    const productId = 1;

    const { body } = await chai.request('http://localhost:3001').get(`/products/${productId}`);

    expect(body).to.be.deep.equal(FIRST_PRODUCT_MOCK);
    stub.restore();
  });

  it('Não deve ser possível pegar um produto com id inválido', async function () {
    const stub = sinon.stub(productsService, 'getProductById').resolves({ status: 404, data: { message: 'Product not found' } });
    const productId = 999;

    const { body } = await chai.request('http://localhost:3001').get(`/products/${productId}`);

    expect(body).to.be.deep.equal({ message: 'Product not found' });
    stub.restore();
  });
});