const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

const validateSalesMiddlewares = require('../../../src/middlewares/validateNewSale');
const productsModel = require('../../../src/models/products.model');

describe('Testa o middleware de validação de vendas', function () {
  it('Deve chamar o próximo middleware se a venda for válida', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    };
    const res = {};
    const next = sinon.stub();

    sinon.stub(productsModel, 'findById').resolves({ id: 1, name: 'Produto 1' });

    await validateSalesMiddlewares.validateSale(req, res, next);

    expect(next.calledOnce).to.be.equal(true);

    productsModel.findById.restore();
  });

  it('Deve retornar um erro se o produto não existir', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    sinon.stub(productsModel, 'findById').resolves(null);

    await validateSalesMiddlewares.validateSale(req, res, next);

    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);

    productsModel.findById.restore();
  });

  it('Deve chamar o próximo middleware se a quantidade do produto for suficiente', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    sinon.stub(productsModel, 'findById').resolves({ id: 1, name: 'Produto 1', quantity: 1 });

    await validateSalesMiddlewares.validateSalesProductQuantity(req, res, next);

    expect(next.calledOnce).to.be.equal(false);

    productsModel.findById.restore();
  });

  it('Deve retornar erro 400 se não for passada a quantidade', async function () {
    const req = {
      body: [
        { productId: 1 },
        { productId: 2, quantity: 2 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    await validateSalesMiddlewares.validateSalesProductQuantity(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
  });

  it('Deve retornar erro 422 se a quantidade for menor que 1', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 0 },
        { productId: 2, quantity: 2 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    await validateSalesMiddlewares.validateSalesProductQuantity(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(false);
    expect(next.calledOnce).to.be.equal(false);
  });
});