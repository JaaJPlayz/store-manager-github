const chai = require('chai');
const sinon = require('sinon');
const { FIRST_PRODUCT_MOCK, MOCK_PRODUCTS } = require('../mocks/products.mock');

const { expect } = chai;
const ProductsModel = require('../../../src/models/products.model');

describe('Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve ser possível listar todos os produtos', async function () {
    const stub = sinon.stub(ProductsModel, 'getAll').returns(MOCK_PRODUCTS);

    const products = await ProductsModel.getAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(MOCK_PRODUCTS);

    stub.restore();
  });

  it('Não deve ser possível pegar um produto que não existe', async function () {
    const stub = sinon.stub(ProductsModel, 'findById').returns({ status: 404, data: { message: 'Product not found' } });

    const product = await ProductsModel.findById(999);

    expect(product).to.be.deep.equal({ status: 404, data: { message: 'Product not found' } });
    stub.restore();
  });

  it('Deve ser possível pegar um produto pelo id', async function () {
    const stub = sinon.stub(ProductsModel, 'findById').returns(FIRST_PRODUCT_MOCK);
    const product = await ProductsModel.findById(1);

    expect(product).to.be.deep.equal(FIRST_PRODUCT_MOCK);
    stub.restore();
  });
});
