const { getAllSalesService, getSaleByIdService } = require('../services/sales.service');

const getAllSales = async (req, res) => {
  const sales = await getAllSalesService();
  res.status(sales.status).json(sales.data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await getSaleByIdService(id);
  res.status(sale.status).json(sale.data);
};

module.exports = {
  getAllSales,
  getSaleById,
};