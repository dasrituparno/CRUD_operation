

import React, { useState } from 'react';

const HomePage = () => {
  const productsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([
    { id: 1, serialNumber: 'SN001', productName: 'Product 1' },
    { id: 2, serialNumber: 'SN002', productName: 'Product 2' },
    { id: 3, serialNumber: 'SN003', productName: 'Product 3' },
    { id: 4, serialNumber: 'SN004', productName: 'Product 4' },
    { id: 5, serialNumber: 'SN005', productName: 'Product 5' },
  
  ]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleEdit = (productId) => {
    console.log(`Edit product with id ${productId}`);
  };

  const handleDelete = (productId) => {
    // Remove the product with the given id from the state
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < Math.ceil(products.length / productsPerPage) ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleAddProduct = () => {
    // Implement the logic to show the add product modal or navigate to the add product page
    // For now, just log a message
    console.log("Add Product functionality not implemented yet.");
  };

  return (
    <>
    <button onClick={handleAddProduct}>Add Product</button>
    <div>
      <h1>Product List</h1>
      

      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.serialNumber}</td>
              <td>{product.productName}</td>
              <td>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={indexOfLastProduct >= products.length}>
          Next
        </button>
      </div>
    </div>
  </>
  );
};

export default HomePage;
