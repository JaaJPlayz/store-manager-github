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

const MOCK_FOR_SERVICES = {
  status: 200,
  data: MOCK_PRODUCTS,
};

module.exports = {
  FIRST_PRODUCT_MOCK,
  MOCK_PRODUCTS,
  MOCK_FOR_SERVICES,
};