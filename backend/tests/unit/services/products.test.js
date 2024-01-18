const chai = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');

const { expect } = chai;

const { FIRST_PRODUCT_MOCK, MOCK_PRODUCTS, PRODUCT_NOT_FOUND_MOCK } = require('../mocks/products.mock');

describe('Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve ser possível listar todos os produtos', async function () {
    const stub = sinon.stub(productsModel, 'getAll').returns(MOCK_PRODUCTS);

    const result = await productsModel.getAll();

    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(MOCK_PRODUCTS);

    stub.restore();
  });

  it('Deve ser possível pegar um produto pelo id', async function () {
    const stub = sinon.stub(productsModel, 'findById').returns(FIRST_PRODUCT_MOCK);

    const result = await productsModel.findById(1);

    expect(result).to.be.deep.equal(FIRST_PRODUCT_MOCK);

    stub.restore();
  });

  it('Não deve ser possível pegar um produto com id inválido', async function () {
    const stub = sinon.stub(productsModel, 'findById').returns(PRODUCT_NOT_FOUND_MOCK);

    const result = await productsModel.findById(999);

    expect(result).to.be.deep.equal(PRODUCT_NOT_FOUND_MOCK);

    stub.restore();
  });
});
