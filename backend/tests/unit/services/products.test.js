const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const productsService = require('../../../src/services/products.service');

const { expect } = chai;

const { FIRST_PRODUCT_MOCK, MOCK_PRODUCTS } = require('../mocks/products.mock');

chai.use(chaiHttp);

describe('Products Service', function () {
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
    const productId = 1;
    const stub = sinon.stub(productsService, 'getProductById').resolves(MOCK_PRODUCTS[0]);

    const { body } = await chai.request('http://localhost:3001').get(`/products/${productId}`);

    expect(body).to.be.deep.equal(FIRST_PRODUCT_MOCK);
    stub.restore();
  });

  it('Não deve ser possível pegar um produto com id inválido', async function () {
    const productId = 999;
    const stub = sinon.stub(productsService, 'getProductById').resolves({ status: 404, data: { message: 'Product not found' } });

    const { body } = await chai.request('http://localhost:3001').get(`/products/${productId}`);

    expect(body).to.be.deep.equal({ message: 'Product not found' });
    stub.restore();
  });
});