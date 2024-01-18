const chai = require('chai');
const sinon = require('sinon');
const { FIRST_SALE_MOCK, SALES_MOCK, SALE_NOT_FOUND_MOCK } = require('../mocks/sales.mock');

const { expect } = chai;
const salesModel = require('../../../src/models/sales.model');

describe('Sales Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve ser possível listar todas as sales', async function () {
    const stub = sinon.stub(salesModel, 'getAllSales').returns(SALES_MOCK);

    const products = await salesModel.getAllSales();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(SALES_MOCK);

    stub.restore();
  });

  it('Não deve ser possível listar uma sale que não existe', async function () {
    const stub = sinon.stub(salesModel, 'findSaleById').returns(SALE_NOT_FOUND_MOCK);

    const product = await salesModel.findSaleById(999);

    expect(product).to.be.deep.equal(SALE_NOT_FOUND_MOCK);
    stub.restore();
  });

  it('Deve ser possível pegar uma sale pelo id', async function () {
    const stub = sinon.stub(salesModel, 'findSaleById').returns(FIRST_SALE_MOCK);
    const product = await salesModel.findSaleById(1);

    expect(product).to.be.deep.equal(FIRST_SALE_MOCK);
    stub.restore();
  });
});
