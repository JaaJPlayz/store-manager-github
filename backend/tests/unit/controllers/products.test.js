const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const { FIRST_PRODUCT_MOCK, MOCK_FOR_SERVICES, MOCK_FOR_SERVICES_NOT_FOUND } = require('../mocks/products.mock');

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
      const stub = sinon.stub(productsService, 'getAllProducts').resolves(MOCK_FOR_SERVICES);
      await productsController.getAllController(req, res);
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
      const stub = sinon.stub(productsService, 'getProductById').resolves(FIRST_PRODUCT_MOCK);
      await productsController.getByIdController(req, res);
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
      const stub = sinon.stub(productsService, 'getProductById').resolves(MOCK_FOR_SERVICES_NOT_FOUND);
      await productsController.getByIdController(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      stub.restore();
    });
  });
});