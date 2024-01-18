const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT date, product_id AS productId, quantity, sale_id AS saleId
    FROM sales_products 
    INNER JOIN sales 
    ON sales_products.sale_id = sales.id 
    ORDER BY sale_id ASC, product_id ASC`,
  );
  return sales;
};

const findSaleById = async (id) => {
  const [[sale]] = await connection.execute(
    `SELECT date, product_id AS productId, quantity, sale_id AS saleId
    FROM sales_products
    INNER JOIN sales
    ON sales_products.sale_id = sales.id
    WHERE sale_id = ?`,
    [id],
  );
  return sale;
};

module.exports = {
  getAllSales,
  findSaleById,
};
