
import React, { useState } from 'react';
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([
    { id: 1, productName: 'Product 1', photo: null, isPhotoSelected: false },
    { id: 2, productName: 'Product 2', photo: null, isPhotoSelected: false },
    { id: 3, productName: 'Product 3', photo: null, isPhotoSelected: false },
    { id: 4, productName: 'Product 4', photo: null, isPhotoSelected: false },
    { id: 5, productName: 'Product 5', photo: null, isPhotoSelected: false },
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
        product.id === newProduct.id
          ? { ...newProduct, isPhotoSelected: !!newProduct.photo }
          : product
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
      { id: prevProducts.length + 1, productName: newProduct.productName, photo: null, isPhotoSelected: false },
    ]);
    // Clear the form field
    setNewProduct({ id: null, productName: '' });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setNewProduct({ ...newProduct, photo: file });
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
          <button type="button" onClick={handleAddProduct} className="add-product-button" >Add Product</button>
        </form>
      </div>

      <div>
        <h1 className='Heading'>Product List</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Product Photo</th>
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
                    <input
                      type="file"
                      onChange={handlePhotoChange}
                    />
                  ) : (
                    <div className="product-photo">
                      {product.photo && <img src={URL.createObjectURL(product.photo)} alt={product.productName} />}
                    </div>
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
                      <button className='delete' onClick={() => handleDelete(product.id)}>Delete</button>
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




