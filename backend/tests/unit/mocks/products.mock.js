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

const MOCK_UPDATE_INPUT = {
  name: 'Bombril de ouro',
};

const MOCK_UPDATE_OUTPUT = {
  id: 1,
  name: 'Bombril de ouro',
};

const FIRST_PRODUCT_MOCK = {
  id: 1,
  name: 'Martelo de Thor',
};

const INSERT_PRODUCT_MOCK = {
  id: 4,
  name: 'Bolo de cenoura',
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

const MOCK_PRODUCT_NOT_FOUND = {
  status: 404, data: 'Product not found', 
};

module.exports = {
  MOCK_PRODUCTS,
  MOCK_FOR_SERVICES,
  MOCK_UPDATE_INPUT,
  MOCK_UPDATE_OUTPUT,
  FIRST_PRODUCT_MOCK,
  INSERT_PRODUCT_MOCK,
  MOCK_PRODUCT_NOT_FOUND,
  PRODUCT_NOT_FOUND_MOCK,
  MOCK_FOR_SERVICES_NOT_FOUND,
};