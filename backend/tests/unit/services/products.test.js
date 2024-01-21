const chai = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

const { expect } = chai;

const {
  FIRST_PRODUCT_MOCK,
  MOCK_PRODUCTS,
  PRODUCT_NOT_FOUND_MOCK,
  INSERT_PRODUCT_MOCK,
  MOCK_UPDATE_OUTPUT,
} = require('../mocks/products.mock');

describe('Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve ser possível listar todos os produtos', async function () {
    const stub = sinon.stub(productsModel, 'getAll').returns(MOCK_PRODUCTS);

    const result = await productsService.getAllProducts();

    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(MOCK_PRODUCTS);

    stub.restore();
  });

  it('Deve ser possível pegar um produto pelo id', async function () {
    const stub = sinon.stub(productsModel, 'findById').returns(FIRST_PRODUCT_MOCK);

    const result = await productsService.getProductById(1);

    expect(result).to.be.deep.equal(FIRST_PRODUCT_MOCK);

    stub.restore();
  });

  it('Não deve ser possível pegar um produto com id inválido', async function () {
    const stub = sinon.stub(productsModel, 'findById').returns(PRODUCT_NOT_FOUND_MOCK);

    const result = await productsModel.findById(999);

    expect(result).to.be.deep.equal(PRODUCT_NOT_FOUND_MOCK);

    stub.restore();
  });

  it('Deve ser possível inserir um novo produto', async function () {
    const stub = sinon.stub(productsModel, 'insertNewProduct').returns(INSERT_PRODUCT_MOCK);

    const result = await productsModel.insertNewProduct('Bolo de cenoura');

    expect(result).to.be.deep.equal(INSERT_PRODUCT_MOCK);

    stub.restore();
  });

  it('Não deve ser possível adicionar um produto com nome inválido', async function () {
    const stub = sinon.stub(productsModel, 'insertNewProduct').returns(null);

    const result = await productsModel.insertNewProduct('');

    expect(result).to.be.deep.equal(null);

    stub.restore();
  });

  it('Deve ser possível atualizar o nome de um produto', async function () {
    const stub = sinon.stub(productsModel, 'updateProductName').returns(MOCK_UPDATE_OUTPUT);

    const result = await productsModel.updateProductName(1, 'Bombril de ouro');

    expect(result).to.be.deep.equal(MOCK_UPDATE_OUTPUT);

    stub.restore();
  });

  it('Não deve ser possível atualizar o nome de um produto que não existe', async function () {
    const stub = sinon.stub(productsModel, 'updateProductName')
      .returns({ status: 404, data: 'Product not found' });
      
    const result = await productsModel.updateProductName(999, 'Bombril de ouro');

    expect(result).to.be.deep.equal({ status: 404, data: 'Product not found' });

    stub.restore();
  });

  it('Não deve ser possível atualizar o nome de um produto com um nome menor que 5 caracteres', async function () {
    const stub = sinon.stub(productsModel, 'updateProductName')
      .returns({ status: 422, data: '"name" length must be at least 5 characters long' });
      
    const result = await productsModel.updateProductName(69, 'Bom');

    expect(result).to.be.deep.equal({ status: 422, data: '"name" length must be at least 5 characters long' });

    stub.restore();
  });

  it('Deve ser possível remover um produto', async function () {
    const stub = sinon.stub(productsModel, 'removeProduct').returns(null);

    const result = await productsModel.removeProduct(1);

    expect(result).to.be.deep.equal(null);

    stub.restore();
  });

  it('Não deve ser possível remover um produto que não existe', async function () {
    const stub = sinon.stub(productsModel, 'removeProduct')
      .returns({ status: 404, data: 'Product not found' });

    const result = await productsModel.removeProduct(999);

    expect(result).to.be.deep.equal({ status: 404, data: 'Product not found' });

    stub.restore();
  });
});
