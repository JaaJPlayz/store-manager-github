const chai = require('chai');
const sinon = require('sinon');
const { MOCK_PRODUCTS } = require('../mocks/products.mock');

const { expect } = chai;
const ProductsModel = require('../../../src/models/products.model');

const connection = require('../../../src/models/connection');

describe('Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve ser possível listar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([MOCK_PRODUCTS]);

    const products = await ProductsModel.getAll();

    expect(products).to.be.deep.equal(MOCK_PRODUCTS);
  });

  it('Não deve ser possível pegar um produto que não existe', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const productId = 999;
    const product = await ProductsModel.findById(productId);

    expect(product).to.be.deep.equal(undefined);
  });

  it('Deve ser possível pegar um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([MOCK_PRODUCTS]);
    const productId = 1;
    const product = await ProductsModel.findById(productId);

    expect(product).to.be.deep.equal(MOCK_PRODUCTS[0]);
  });
});