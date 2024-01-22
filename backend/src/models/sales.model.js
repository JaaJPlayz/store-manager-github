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
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
    FROM sales_products
    JOIN sales
    ON sales_products.sale_id = sales.id
    WHERE id = ?`,
    [id],
  );
  return sale;
};

const insertNewSale = async (timeAdded) => {
  const [createdSale] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [timeAdded],
  );
  return createdSale;
};

const insertProductIntoSale = async (nextID, createdSale) => {
  if (createdSale) {
    const SQLquery = createdSale.map((sale) => {
      const { productId, quantity } = sale;
      return connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [nextID, productId, quantity],
      );
    });
    const addedSale = await Promise.all(SQLquery);
    return addedSale;
  }
};

module.exports = {
  getAllSales,
  findSaleById,  
  insertNewSale,
  insertProductIntoSale,
};
