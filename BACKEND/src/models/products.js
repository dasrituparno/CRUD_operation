const connection = require('../db/sqldb');

function createProductTable() {
  return new Promise((resolve, reject) => {
    const createProductTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        product_description TEXT NOT NULL,
        product_image VARCHAR(255) NOT NULL
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

function insertProduct(productName, productDescription, productImage) {
  return new Promise((resolve, reject) => {
    const insertProductQuery = `
      INSERT INTO products (product_name, product_description, product_image)
      VALUES (?, ?, ?)
    `;

    connection.query(insertProductQuery, [productName, productDescription, productImage], (err, results) => {
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

// GET method for retrieving a product by ID
function getProductById(id) {
  return new Promise((resolve, reject) => {
    const getProductByIdQuery = 'SELECT * FROM products WHERE id = ?'; // Modified query to select a product by its ID

    connection.query(getProductByIdQuery, [id], (err, results) => {
      if (err) {
        console.error(`Error retrieving product with ID ${id}:`, err);
        reject(err);
      } else {
        if (results.length > 0) {
          resolve(results[0]); // Resolve with the first (and only) result
        } else {
          resolve(null); // Resolve with null if no product with the specified ID is found
        }
      }
    });
  });
}


// // PUT method for products
// function updateProduct(id, productName, productDescription, productImage) {
//   return new Promise((resolve, reject) => {
//     const updateProductQuery = `
//       UPDATE products
//       SET product_name = ?, product_description = ?, product_image = ?
//       WHERE id = ?
//     `;

//     // Check if productImage is provided, otherwise set it to null or some default value
//     const image = productImage ? productImage.filename : null;

//     connection.query(
//       updateProductQuery,
//       [productName, productDescription, image, id], // Use image variable
//       (err, results) => {
//         if (err) {
//           console.error('Error updating product data:', err);
//           reject(err);
//         } else {
//           console.log('Product data updated successfully');
//           resolve(results);
//         }
//       }
//     );
//   });
// }




// PUT method for products
function updateProduct(id, productName, productDescription, productImage) {
  return new Promise((resolve, reject) => {
    console.log('Received productImage:', productImage); // Log the received productImage
    const updateProductQuery = `
      UPDATE products
      SET product_name = ?, product_description = ?, product_image = ?
      WHERE id = ?
    `;

    // Check if productImage is provided, otherwise set it to null or some default value
    const image = productImage ? productImage.filename : null;

    console.log('Using image:', image); // Log the image being used in the query

    connection.query(
      updateProductQuery,
      [productName, productDescription, image, id], // Use image variable
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
      [...Object.values(updates), id], // Include ID at the end
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



// // PATCH method for products
// function patchProduct(id, updates) {
//   return new Promise((resolve, reject) => {
//     console.log('Received Updates:', updates);

//     const { product_name, product_description, product_image } = updates;
    
//     const patchProductQuery = `
//       UPDATE products
//       SET product_name = ? , product_description = ?, product_image = ?
//       WHERE id = ?
//     `;

//     const values = [product_name, product_description, product_image, id];

//     console.log("patchProductQuery:", patchProductQuery)
//     console.log("values:", values)

//     connection.query(
//       patchProductQuery,
//       values,
//       (err, results) => {
//         if (err) {
//           console.error('Error patching product data:', err);
//           reject(err);
//         } else {
//           console.log('Product data patched successfully');
//           console.log('Results:', results);
//           resolve(results);
//         }
//       }
//     );
//   });
// }



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
  getProductById
};