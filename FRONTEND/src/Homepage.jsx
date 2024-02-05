import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import "./HomePage.css"

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ product_name: '', product_description: '', productImage: null});
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const authToken = Cookies.get("authToken");
      const response = await fetch('http://localhost:5000/products', {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
    }
  };

  const handleEdit = (productId) => {
    setEditingProductId(productId);
    const productToEdit = products.find((product) => product.id === productId);
    setNewProduct({ ...productToEdit });
  };

  const handleSaveEdit = async (e) => {
     e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('product_name', newProduct.product_name);
      formData.append('product_description', newProduct.product_description);
      formData.append('productImage', newProduct.productImage);
      
      const authToken = Cookies.get("authToken");
      const response = await fetch(`http://localhost:5000/products/${newProduct.id}`, {
        method: 'PUT',
        headers:{
          Authorization: `Bearer ${authToken}`,
        },
        
        body: formData,
      });

      if (response.ok) {
        fetchProducts();
        setEditingProductId(null);
        setNewProduct({ product_name: '', product_description: '', productImage: null });
      } else {
        console.error('Failed to save edit');
        setError('Failed to save edit. Please try again.');
      }
    } catch (error) {
      console.error('Error saving edit:', error);
      setError('Error saving edit. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setNewProduct({ product_name: '', product_description: '', productImage: null });
  };

  const handleDelete = async (productId) => {
    try {
      const authToken = Cookies.get("authToken");
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
        headers:{
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Failed to delete product');
        setError('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product. Please try again.');
    }
  };

  const handleAddProduct = async () => {
    

    let formData = new FormData();
    formData.append('product_name', newProduct.product_name);
    formData.append('product_description', newProduct.product_description);
    formData.append('productImage', newProduct.productImage);

    try {
      const authToken = Cookies.get("authToken");
      const response = await fetch('http://localhost:5000/add-products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData,
      });

      if (response.ok) {
        fetchProducts();
        setNewProduct({ product_name: '', product_description: '', productImage: null });
      } else {
        console.error('Failed to add product');
        setError('Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product. Please try again.');
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setNewProduct({ ...newProduct, productImage: file });
  };

  return (
    <>
      {error && <div className="error-message">{error}</div>}

      <div>
        <form>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={newProduct.product_name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, product_name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="productDescription">Product Description:</label>
            <textarea
              id="productDescription"
              value={newProduct.product_description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, product_description: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="productPhoto">Product Photo:</label>
            <input
              type="file"
              id="productPhoto"
              onChange={handlePhotoChange}
            />
          </div>
          <button type="button" onClick={handleAddProduct}>Add Product</button>
        </form>
      </div>

      <div>
        <h1>Product List</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Product Description</th>
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
                      value={newProduct.product_name}
                      onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                    />
                  ) : (
                    product.product_name
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <textarea
                      value={newProduct.product_description}
                      onChange={(e) => setNewProduct({ ...newProduct, product_description: e.target.value })}
                    />
                  ) : (
                    product.product_description
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
                     {product.productImage && (
                       <img
                       src={`http://localhost:5000/uploads/${product.product_image.replace('uploads')}`}
                       alt={product.product_name} 
                     />
                      )}

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