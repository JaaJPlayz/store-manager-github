const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const { FIRST_SALE_MOCK, SALES_MOCK, SALE_NOT_FOUND_MOCK } = require('../mocks/sales.mock');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Testes para sales controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando a venda está presente na base de dados', function () {
    it('Retorna todas as vendas', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const stub = sinon.stub(salesService, 'getAllSalesService').returns(SALES_MOCK);
      await salesController.getAllSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      stub.restore();
    });
  
    it('Retorna uma única venda por meio do ID', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const req = {
        params:
        {
          id: 1,
        },
      };
      const stub = sinon.stub(salesService, 'getSaleByIdService').returns(FIRST_SALE_MOCK);
      await salesController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(200);
  
      stub.restore();
    });
  });

  describe('Quando a venda não está presente na base de dados', function () {
    it('Retorna uma mensagem de erro caso a venda não seja encontrada', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const req = {
        params:
        {
          id: 1,
        },
      };
      const stub = sinon.stub(salesService, 'getSaleByIdService').returns(SALE_NOT_FOUND_MOCK);
      await salesController.getSaleById(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      stub.restore();
    });
  });
});