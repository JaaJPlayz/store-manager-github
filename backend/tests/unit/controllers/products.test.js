const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const { 
  FIRST_PRODUCT_MOCK,
  MOCK_FOR_SERVICES,
  MOCK_FOR_SERVICES_NOT_FOUND,
  MOCK_UPDATE_OUTPUT,
} = require('../mocks/products.mock');

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

  describe('Quando o produto é inserido com sucesso', function () {
    it('Retorna o produto inserido', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const req = {
        body:
        {
          name: 'Bolo de cenoura',
        },
      };
      const stub = sinon.stub(productsService, 'insertNewProduct').resolves(MOCK_FOR_SERVICES);
      await productsController.insertNewProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(201);
      stub.restore();
    });
  });

  describe('Quando o produto não é inserido com sucesso', function () {
    it('Sem nome', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const req = {
        body: {},
      };
      const stub = sinon.stub(productsService, 'insertNewProduct').resolves(null);
      await productsController.insertNewProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
      stub.restore();
    });
    
    it('Nome com menos de 5 caracteres', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const req = {
        body: {
          name: 'hjkl',
        },
      };
      const stub = sinon.stub(productsService, 'insertNewProduct').resolves(null);
      await productsController.insertNewProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
      stub.restore();
    });
  });

  describe('Quando o produto é atualizado com sucesso', function () {
    it('Retorna o produto atualizado', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
      };
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'Bombril de ouro',
        },
      };
      const stub = sinon.stub(productsService, 'updateProductName').resolves(MOCK_UPDATE_OUTPUT);
      await productsController.updateProductName(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      stub.restore();
    });
  });

  describe('Quando o produto não é atualizado com sucesso', function () {
    it('Sem nome', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const req = {
        params: {
          id: 1,
        },
        body: {},
      };
      const stub = sinon.stub(productsService, 'updateProductName').resolves(null);
      await productsController.updateProductName(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
      stub.restore();
    });
    
    it('Nome com menos de 5 caracteres', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'hjkl',
        },
      };
      const stub = sinon.stub(productsService, 'updateProductName').resolves(null);
      await productsController.updateProductName(req, res);
  
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
      stub.restore();
    });

    it('Produto não encontrado', async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'Bombril de ouro',
        },
      };
      const stub = sinon.stub(productsService, 'updateProductName').resolves({ message: 'Product not found' });
      await productsController.updateProductName(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
      stub.restore();
    });
  });
});