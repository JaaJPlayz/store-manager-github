const chai = require('chai');
const sinon = require('sinon');
const { 
  FIRST_PRODUCT_MOCK,
  MOCK_PRODUCTS,
  INSERT_PRODUCT_MOCK,
  MOCK_UPDATE_OUTPUT,
} = require('../mocks/products.mock');

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

  it('Deve ser possível inserir um novo produto', async function () {
    const stub = sinon.stub(ProductsModel, 'insertNewProduct').returns(INSERT_PRODUCT_MOCK);
    const product = await ProductsModel.insertNewProduct('Bolo de cenoura');

    expect(product).to.be.deep.equal(INSERT_PRODUCT_MOCK);
    stub.restore();
  });

  it('Deve ser possível atualizar o nome de um produto', async function () {
    const stub = sinon.stub(ProductsModel, 'updateProductName').returns(MOCK_UPDATE_OUTPUT);
    const product = await ProductsModel.updateProductName(1, 'Bombril de ouro');

    expect(product).to.be.deep.equal(MOCK_UPDATE_OUTPUT);
    stub.restore();
  });

  it('Não deve ser possível atualizar o nome de um produto que não existe', async function () {
    const stub = sinon.stub(ProductsModel, 'updateProductName')
      .returns({ status: 404, data: 'Product not found' });
      
    const product = await ProductsModel.updateProductName(999, 'Bombril de ouro');

    expect(product).to.be.deep.equal({ status: 404, data: 'Product not found' });
    stub.restore();
  });

  it('Não deve ser possível atualizar o nome de um produto com um nome menor que 5 caracteres', async function () {
    const stub = sinon.stub(ProductsModel, 'updateProductName')
      .returns({ status: 422, data: '"name" length must be at least 5 characters long' });

    const product = await ProductsModel.updateProductName(69, 'Bom');

    expect(product).to.be.deep.equal({ status: 422, data: '"name" length must be at least 5 characters long' });
    stub.restore();
  });

  it('Deve ser possível remover um produto', async function () {
    const stub = sinon.stub(ProductsModel, 'removeProduct').returns({ status: 200, data: 'Product deleted successfully' });

    const product = await ProductsModel.removeProduct(1);

    expect(product).to.be.deep.equal({ status: 200, data: 'Product deleted successfully' });
    stub.restore();
  });
});
