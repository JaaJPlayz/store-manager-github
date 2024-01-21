const salesService = require('../services/sales.service');

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesService.getAllSalesService();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesService.getSaleByIdService(id);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const insertSale = async (req, res) => {
  const sale = req.body;
  try {
    const insertedSaleID = await salesService.insertProductIntoSale(sale);
    const productsSold = await salesService.getSaleByIdService(insertedSaleID)
      .then((item) => item.map(({ productId, quantity }) => ({ productId, quantity })));
    res.status(201).json({ id: insertedSaleID, itemsSold: productsSold });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
};
