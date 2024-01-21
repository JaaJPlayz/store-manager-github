const salesModel = require('../models/sales.model');

const getAllSalesService = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSaleByIdService = async (id) => {
  const sale = await salesModel.findSaleById(id);
  return sale;
};

const insertNewSale = async () => {
  const timeAdded = new Date();
  const newSale = await salesModel.insertNewSale(timeAdded);
  return newSale;
};

const insertProductIntoSale = async (newSale) => {
  const addNewSale = await insertNewSale();
  const { insertId } = addNewSale;
  await salesModel.insertProductIntoSale(insertId, newSale);
  return insertId;
};

module.exports = {
  getAllSalesService,
  getSaleByIdService,
  insertProductIntoSale,
};
