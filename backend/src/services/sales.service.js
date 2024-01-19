const salesModel = require('../models/sales.model');

const getAllSalesService = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSaleByIdService = async (id) => {
  const sale = await salesModel.findSaleById(id);
  return sale;
};

module.exports = {
  getAllSalesService,
  getSaleByIdService,
};