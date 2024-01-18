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

const FIRST_SALE_MOCK = {
  id: 1,
  date: '2024-01-18 01:11:44',
  saleId: 1,
  productId: 1,
  quantity: 5,
};

const SALE_NOT_FOUND_MOCK = { status: 404, data: { message: 'Product not found' } };

const MOCK_FOR_SERVICES = {
  status: 200,
  data: SALES_MOCK,
};

module.exports = {
  FIRST_SALE_MOCK,
  SALES_MOCK,
  MOCK_FOR_SERVICES,
  SALE_NOT_FOUND_MOCK,
};