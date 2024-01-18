const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const FIRST_PRODUCT_MOCK = {
  id: 1,
  name: 'Martelo de Thor',
};

const PRODUCT_NOT_FOUND_MOCK = {
  message: 'Product not found',
};

const MOCK_FOR_SERVICES = {
  status: 200,
  data: MOCK_PRODUCTS,
};

const MOCK_FOR_SERVICES_NOT_FOUND = {
  status: 200,
  data: MOCK_PRODUCTS,
};

module.exports = {
  FIRST_PRODUCT_MOCK,
  MOCK_PRODUCTS,
  MOCK_FOR_SERVICES,
  PRODUCT_NOT_FOUND_MOCK,
  MOCK_FOR_SERVICES_NOT_FOUND,
};