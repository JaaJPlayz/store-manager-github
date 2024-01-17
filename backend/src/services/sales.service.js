const { getAllSales, findSaleById } = require('../models/sales.model');

const getAllSalesService = async () => {
  const sales = await getAllSales();
  return { status: 200, data: sales };
};

const getSaleByIdService = async (id) => {
  const sale = await findSaleById(id);
  if (!sale || sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' } };
  }
  return { status: 200, data: sale };
};

module.exports = {
  getAllSalesService,
  getSaleByIdService,
};