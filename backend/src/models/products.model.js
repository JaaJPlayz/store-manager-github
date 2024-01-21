const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC',
  );
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

const insertNewProduct = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );

  const newProduct = {
    id: product.insertId,
    name,
  };

  return newProduct;
};

const updateProductName = async (id, name) => {
  const [product] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );

  return product;
};

const removeProduct = async (id) => {
  const [product] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );

  return product;
};

module.exports = {
  getAll,
  findById,
  insertNewProduct,
  updateProductName,
  removeProduct,
};
