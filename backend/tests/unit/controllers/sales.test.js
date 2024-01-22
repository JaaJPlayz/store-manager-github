const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const { 
  SALES_MOCK,
  FIRST_SALE_MOCK,
  SALE_NOT_FOUND_MOCK,
  INSERT_ONE_SALE_MOCK,
  INSERT_TWO_SALES_MOCK,
  RESULT_INSERT_ONE_SALE_MOCK,
  RESULT_INSERT_TWO_SALES_MOCK,
  RESULT_NEW_INSERT_ONE_SALE_MOCK,
  RESULT_NEW_INSERT_TWO_SALES_MOCK,
} = require('../mocks/sales.mock');

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
      expect(res.json).to.have.been.calledWith(SALES_MOCK);
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
      expect(res.json).to.have.been.calledWith(FIRST_SALE_MOCK);
  
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

  describe('Quando a venda é inserida com sucesso', function () {
    it('Deve ser possível inserir uma venda', async function () {
      const req = {
        body: INSERT_ONE_SALE_MOCK,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const stub = sinon.stub(salesService, 'insertProductIntoSale').resolves(RESULT_INSERT_ONE_SALE_MOCK);
      const stub2 = sinon.stub(salesService, 'getSaleByIdService').resolves(RESULT_NEW_INSERT_ONE_SALE_MOCK);
      await salesController.insertSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      stub.restore();
      stub2.restore();
    });

    it('Deve ser possível inserir duas vendas', async function () {
      const req = {
        body: INSERT_TWO_SALES_MOCK,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const stub = sinon.stub(salesService, 'insertProductIntoSale').resolves(RESULT_INSERT_TWO_SALES_MOCK);
      const stub2 = sinon.stub(salesService, 'getSaleByIdService').resolves(RESULT_NEW_INSERT_TWO_SALES_MOCK);
      await salesController.insertSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      stub.restore();
      stub2.restore();
    });
  });
});