const FIRST_SALE_MOCK = {
  id: 1,
  date: '2024-01-18 01:11:44',
  saleId: 1,
  productId: 1,
  quantity: 5,
};

const MOCK_FOR_UPDATE_SALE = {
  saleId: 3,
  productId: 3,
  quantity: 23,
};

const SALES_MOCK = [
  {
    id: 1,
    date: '2024-01-18 01:11:44',
    saleId: 1,
    productId: 1,
    quantity: 5,
  },
  {
    id: 2,
    date: '2024-01-18 01:11:44',
    saleId: 1,
    productId: 2,
    quantity: 10,
  },
  {
    id: 3,
    date: '2024-01-18 01:11:44',
    saleId: 2,
    productId: 3,
    quantity: 15,
  },
];

const INSERT_ONE_SALE_MOCK = [
  {
    productId: 1,
    quantity: Math.floor(Math.random() * 99) + 1,
  },
];

const INSERT_TWO_SALES_MOCK = [
  {
    productId: 1,
    quantity: Math.floor(Math.random() * 99) + 1,
  },
  {
    productId: 2,
    quantity: Math.floor(Math.random() * 99) + 1,
  },
];

const RESULT_INSERT_ONE_SALE_MOCK = 666;

const RESULT_INSERT_TWO_SALES_MOCK = {
  id: 666,
};

const RESULT_NEW_INSERT_ONE_SALE_MOCK = [
  {
    productId: 3,
    quantity: Math.floor(Math.random() * 99) + 1,
  },
];

const RESULT_NEW_INSERT_TWO_SALES_MOCK = [
  {
    productId: 3,
    quantity: Math.floor(Math.random() * 99) + 1,
  },
  {
    productId: 4,
    quantity: Math.floor(Math.random() * 99) + 1,
  },
];

const SALE_NOT_FOUND_MOCK = { status: 404, data: { message: 'Product not found' } };

const MOCK_FOR_SERVICES = {
  status: 200,
  data: SALES_MOCK,
};

module.exports = {
  SALES_MOCK,
  FIRST_SALE_MOCK,
  MOCK_FOR_SERVICES,
  SALE_NOT_FOUND_MOCK,
  INSERT_ONE_SALE_MOCK,
  MOCK_FOR_UPDATE_SALE,
  INSERT_TWO_SALES_MOCK,
  RESULT_INSERT_ONE_SALE_MOCK,
  RESULT_INSERT_TWO_SALES_MOCK,
  RESULT_NEW_INSERT_ONE_SALE_MOCK,
  RESULT_NEW_INSERT_TWO_SALES_MOCK,
};