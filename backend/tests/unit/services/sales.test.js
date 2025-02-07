const chai = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

const { expect } = chai;

const { 
  FIRST_SALE_MOCK,
  SALES_MOCK,
  SALE_NOT_FOUND_MOCK,
  INSERT_ONE_SALE_MOCK,
  INSERT_TWO_SALES_MOCK,
  RESULT_INSERT_ONE_SALE_MOCK,
  RESULT_INSERT_TWO_SALES_MOCK,
} = require('../mocks/sales.mock');

describe('Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve ser possível listar todas as sales', async function () {
    const stub = sinon.stub(salesModel, 'getAllSales').returns(SALES_MOCK);

    const products = await salesService.getAllSalesService();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(SALES_MOCK);

    stub.restore();
  });

  it('Deve ser possível pegar uma sale pelo id', async function () {
    const stub = sinon.stub(salesModel, 'findSaleById').returns(FIRST_SALE_MOCK);

    const product = await salesService.getSaleByIdService(1);

    expect(product).to.be.deep.equal(FIRST_SALE_MOCK);

    stub.restore();
  });

  it('Não deve ser possível pegar um produto com id inválido', async function () {
    const stub = sinon.stub(salesModel, 'findSaleById').returns(SALE_NOT_FOUND_MOCK);

    const product = await salesService.getSaleByIdService(999);

    expect(product).to.be.deep.equal(SALE_NOT_FOUND_MOCK);

    stub.restore();
  });

  it('Deve ser possível inserir uma sale', async function () {
    const stub = sinon.stub(salesModel, 'insertNewSale').returns(RESULT_INSERT_ONE_SALE_MOCK);

    const product = await salesModel.insertNewSale(INSERT_ONE_SALE_MOCK);

    expect(product).to.be.deep.equal(RESULT_INSERT_ONE_SALE_MOCK);

    stub.restore();
  });

  it('Deve ser possível inserir duas sales', async function () {
    const stub = sinon.stub(salesModel, 'insertNewSale').returns(RESULT_INSERT_TWO_SALES_MOCK);

    const product = await salesModel.insertNewSale(INSERT_TWO_SALES_MOCK);

    expect(product).to.be.deep.equal(RESULT_INSERT_TWO_SALES_MOCK);

    stub.restore();
  });
});
