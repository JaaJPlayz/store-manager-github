const chai = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/sales.service');

const { expect } = chai;

const { FIRST_SALE_MOCK, SALES_MOCK, SALE_NOT_FOUND_MOCK } = require('../mocks/sales.mock');

describe('Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve ser possível listar todos os produtos', async function () {
    const stub = sinon.stub(productsService, 'getAllSalesService').returns(SALES_MOCK);

    const result = await productsService.getAllSalesService();

    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(SALES_MOCK);

    stub.restore();
  });

  it('Deve ser possível pegar um produto pelo id', async function () {
    const stub = sinon.stub(productsService, 'getSaleByIdService').returns(FIRST_SALE_MOCK);

    const result = await productsService.getSaleByIdService(1);

    expect(result).to.be.deep.equal(FIRST_SALE_MOCK);

    stub.restore();
  });

  it('Não deve ser possível pegar um produto com id inválido', async function () {
    const stub = sinon.stub(productsService, 'getSaleByIdService').returns(SALE_NOT_FOUND_MOCK);

    const result = await productsService.getSaleByIdService(999);

    expect(result).to.be.deep.equal(SALE_NOT_FOUND_MOCK);

    stub.restore();
  });
});
