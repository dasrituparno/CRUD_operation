const connection = require('../db/sqldb');

function createProductTable() {
  return new Promise((resolve, reject) => {
    const createProductTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        product_description TEXT NOT NULL
      )
    `;

    connection.query(createProductTableQuery, (err, results) => {
      if (err) {
        console.error('Error creating products table:', err);
        reject(err);
      } else {
        console.log('MySQL products table created or already exists');
        resolve();
      }
    });
  });
}

// POST method for products

function insertProduct(productName, productDescription) {
  return new Promise((resolve, reject) => {
    const insertProductQuery = `
      INSERT INTO products (product_name, product_description)
      VALUES (?, ?)
    `;

    connection.query(insertProductQuery, [productName, productDescription], (err, results) => {
      if (err) {
        console.error('Error inserting product data:', err);
        reject(err);
      } else {
        console.log('Product data inserted successfully');
        resolve(results);
      }
    });
  });
}

// GET method for products

function getProducts() {
  return new Promise((resolve, reject) => {
    const getProductsQuery = 'SELECT * FROM products';

    connection.query(getProductsQuery, (err, results) => {
      if (err) {
        console.error('Error retrieving products:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// PUT method for products

function updateProduct(id, productName, productDescription) {
  return new Promise((resolve, reject) => {
    const updateProductQuery = `
      UPDATE products
      SET product_name = ?, product_description = ?
      WHERE id = ?
    `;

    connection.query(
      updateProductQuery,
      [productName, productDescription, id],
      (err, results) => {
        if (err) {
          console.error('Error updating product data:', err);
          reject(err);
        } else {
          console.log('Product data updated successfully');
          resolve(results);
        }
      }
    );
  });
}

// PATCH method for products

function patchProduct(id, updates) {
  return new Promise((resolve, reject) => {
    // Build SET clause for partial update
    const setClause = Object.entries(updates)
      .map(([key, value]) => `${key} = ?`)
      .join(', ');

    const patchProductQuery = `
      UPDATE products
      SET ${setClause}
      WHERE id = ?
    `;

    connection.query(
      patchProductQuery,
      [...Object.values(updates), id],
      (err, results) => {
        if (err) {
          console.error('Error patching product data:', err);
          reject(err);
        } else {
          console.log('Product data patched successfully');
          resolve(results);
        }
      }
    );
  });
}

// DELETE method for products

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    const deleteProductQuery = 'DELETE FROM products WHERE id = ?';

    connection.query(deleteProductQuery, [id], (err, results) => {
      if (err) {
        console.error('Error deleting product:', err);
        reject(err);
      } else {
        console.log('Product deleted successfully');
        resolve(results);
      }
    });
  });
}

module.exports = {
  createProductTable,
  insertProduct,
  getProducts,
  updateProduct,
  patchProduct,
  deleteProduct,
};