const mysql2 = require('mysql2/promise');

const sql2Settings = {
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  port: process.env.MYSQL_PORT || 3306,
  password: process.env.MYSQL_PASSWORD || 'password',
};

const connection = mysql2.createPool(sql2Settings);

module.exports = connection;
