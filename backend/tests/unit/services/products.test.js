const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

const { expect } = chai;

const { FIRST_PRODUCT_MOCK, MOCK_PRODUCTS } = require('../mocks/products.mock');

chai.use(chaiHttp);

describe('Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve ser possível listar todos os produtos', async function () {
    const stub = sinon.stub(productsModel, 'getAll').resolves(MOCK_PRODUCTS);

    const products = await productsService.getAllProducts();

    expect(products).to.be.deep.equal({ status: 200, data: MOCK_PRODUCTS });

    stub.restore();
  });

  it('Deve ser possível pegar um produto pelo id', async function () {
    const productId = 1;
    const stub = sinon.stub(productsModel, 'findById').resolves(MOCK_PRODUCTS[0]);

    const product = await productsService.getProductById(productId);

    expect(product).to.be.deep.equal({ status: 200, data: FIRST_PRODUCT_MOCK });

    stub.restore();
  });

  it('Não deve ser possível pegar um produto com id inválido', async function () {
    const productId = 999;
    const stub = sinon.stub(productsModel, 'findById').resolves({ status: 404, data: { message: 'Product not found' } });

    const product = await productsService.getProductById(productId);

    expect(product).to.be.deep.equal({ status: 404, data: { message: 'Product not found' } });

    stub.restore();
  });
});