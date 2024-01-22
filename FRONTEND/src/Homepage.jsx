
import React, { useState } from 'react';
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([
    { id: 1, productName: 'Product 1' },
    { id: 2, productName: 'Product 2' },
    { id: 3, productName: 'Product 3' },
    { id: 4, productName: 'Product 4' },
    { id: 5, productName: 'Product 5' },
  ]);

  const [newProduct, setNewProduct] = useState({ id: null, productName: '' });
  const [editingProductId, setEditingProductId] = useState(null);

  const handleEdit = (productId) => {
    setEditingProductId(productId);
    const productToEdit = products.find((product) => product.id === productId);
    setNewProduct({ ...productToEdit });
  };

  const handleSaveEdit = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === newProduct.id ? { ...product, productName: newProduct.productName } : product
      )
    );
    setEditingProductId(null);
    setNewProduct({ id: null, productName: '' });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setNewProduct({ id: null, productName: '' });
  };

  const handleDelete = (productId) => {
    // Remove the product with the given id from the state
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const handleAddProduct = () => {
    // Add the new product to the state with a new id
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1, productName: newProduct.productName },
    ]);
    // Clear the form field
    setNewProduct({ id: null, productName: '' });
  };

  return (
    <>
      <div>
        
        <form>
          <div className='product-name-field'>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={newProduct.productName}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productName: e.target.value })
              }
            />
          </div>
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </div>

      <div>
        <h1>Product List</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  {editingProductId === product.id ? (
                    <input
                      type="text"
                      value={newProduct.productName}
                      onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                    />
                  ) : (
                    product.productName
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(product.id)}>Edit</button>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePage;
