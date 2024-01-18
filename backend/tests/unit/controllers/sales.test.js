const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const { FIRST_SALE_MOCK, SALES_MOCK, MOCK_FOR_SERVICES_NOT_FOUND } = require('../mocks/sales.mock');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Testes para products controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Quando o produto está presente na base de dados', function () {
    it('Retorna todos os produtos', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const stub = sinon.stub(salesService, 'getAllSalesService').resolves(SALES_MOCK);
      await salesController.getAllSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      stub.restore();
    });
  
    it('Retorna um único produto por meio do ID', async function () {
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
      const stub = sinon.stub(salesService, 'getSaleByIdService').resolves(FIRST_SALE_MOCK);
      await salesController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(200);
  
      stub.restore();
    });
  });

  describe('Quando o produto não está presente na base de dados', function () {
    it('Retorna uma mensagem de erro caso o produto não seja encontrado', async function () {
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
      const stub = sinon.stub(salesService, 'getSaleByIdService').resolves(MOCK_FOR_SERVICES_NOT_FOUND);
      await salesController.getSaleById(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      stub.restore();
    });
  });
});