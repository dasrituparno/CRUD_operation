// // import React, { useState, useEffect } from 'react';
// // import "./HomePage.css";

// // const HomePage = () => {
// //   const [products, setProducts] = useState([]);
// //   const [newProduct, setNewProduct] = useState({ product_name: '', product_description: '', productImage: null });
// //   const [editingProductId, setEditingProductId] = useState(null);

// //   // Fetch products from the backend API
// //   const fetchProducts = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/products');
// //       const data = await response.json();
// //       setProducts(data); // Assuming your API returns an array of products
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts(); // Fetch products when the component mounts
// //   }, []); // Empty dependency array means this effect runs only once after the initial render

// //   const handleEdit = (productId) => {
// //     setEditingProductId(productId);
// //     const productToEdit = products.find((product) => product.id === productId);
// //     setNewProduct({ ...productToEdit });
// //   };

// //   const handleSaveEdit = async () => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/products/${newProduct.id}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(newProduct),
// //       });
// //       if (response.ok) {
// //         fetchProducts(); // Fetch updated products after saving edit
// //         setEditingProductId(null);
// //         setNewProduct({ product_name: '', product_description: '', productImage: null });
// //       } else {
// //         console.error('Failed to save edit');
// //       }
// //     } catch (error) {
// //       console.error('Error saving edit:', error);
// //     }
// //   };

// //   const handleCancelEdit = () => {
// //     setEditingProductId(null);
// //     setNewProduct({ product_name: '', product_description: '', productImage: null });
// //   };

// //   const handleDelete = async (productId) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/products/${productId}`, {
// //         method: 'DELETE',
// //       });
// //       if (response.ok) {
// //         fetchProducts(); // Fetch updated products after deleting
// //       } else {
// //         console.error('Failed to delete product');
// //       }
// //     } catch (error) {
// //       console.error('Error deleting product:', error);
// //     }
// //   };

// //   const handleAddProduct = async () => {
// //     try {
// //       const formData = new FormData();
// //       formData.append('product_name', newProduct.product_name);
// //       formData.append('product_description', newProduct.product_description);
// //       formData.append('productImage', newProduct.productImage);

// //       const response = await fetch('http://localhost:5000/products', {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (response.ok) {
// //         fetchProducts(); // Fetch updated products after adding
// //         setNewProduct({ product_name: '', product_description: '', productImage: null });
// //       } else {
// //         console.error('Failed to add product');
// //       }
// //     } catch (error) {
// //       console.error('Error adding product:', error);
// //     }
// //   };

// //   const handlePhotoChange = (event) => {
// //     const file = event.target.files[0];
// //     setNewProduct({ ...newProduct, productImage: file });
// //   };

// //   return (
// //     <>
// //       <div>
// //         <form>
// //           <div className='product-name-field'>
// //             <label htmlFor="productName">Product Name:</label>
// //             <input
// //               type="text"
// //               id="productName"
// //               value={newProduct.product_name}
// //               onChange={(e) =>
// //                 setNewProduct({ ...newProduct, product_name: e.target.value })
// //               }
// //             />
// //           </div>
// //           <div className='product-description-field'>
// //             <label htmlFor="productDescription">Product Description:</label>
// //             <textarea
// //               id="productDescription"
// //               value={newProduct.product_description}
// //               onChange={(e) =>
// //                 setNewProduct({ ...newProduct, product_description: e.target.value })
// //               }
// //             />
// //           </div>
// //           <div className='product-photo-field'>
// //             <label htmlFor="productPhoto">Product Photo:</label>
// //             <input
// //               type="file"
// //               id="productPhoto"
// //               onChange={handlePhotoChange}
// //             />
// //           </div>
// //           <button type="button" onClick={handleAddProduct} className="add-product-button" >Add Product</button>
// //         </form>
// //       </div>

// //       <div>
// //         <h1 className='Heading'>Product List</h1>

// //         <table>
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Product Name</th>
// //               <th>Product Description</th>
// //               <th>Product Photo</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {products.map((product) => (
// //               <tr key={product.id}>
// //                 <td>{product.id}</td>
// //                 <td>
// //                   {editingProductId === product.id ? (
// //                     <input
// //                       type="text"
// //                       value={newProduct.product_name}
// //                       onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
// //                     />
// //                   ) : (
// //                     product.product_name
// //                   )}
// //                 </td>
// //                 <td>
// //                   {editingProductId === product.id ? (
// //                     <textarea
// //                       value={newProduct.product_description}
// //                       onChange={(e) => setNewProduct({ ...newProduct, product_description: e.target.value })}
// //                     />
// //                   ) : (
// //                     product.product_description
// //                   )}
// //                 </td>
// //                 <td>
// //                   {editingProductId === product.id ? (
// //                     <input
// //                       type="file"
// //                       onChange={handlePhotoChange}
// //                     />
// //                   ) : (
// //                     <div className="product-photo">
// //                       {product.productImage && <img src={URL.createObjectURL(product.productImage)} alt={product.product_name} />}
// //                     </div>
// //                   )}
// //                 </td>
// //                 <td>
// //                   {editingProductId === product.id ? (
// //                     <>
// //                       <button onClick={handleSaveEdit}>Save</button>
// //                       <button onClick={handleCancelEdit}>Cancel</button>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <button onClick={() => handleEdit(product.id)}>Edit</button>
// //                       <button className='delete' onClick={() => handleDelete(product.id)}>Delete</button>
// //                     </>
// //                   )}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </>
// //   );
// // };

// // export default HomePage;





import React, { useState, useEffect } from 'react';
// import useHistory from 'react-router-dom';
import Cookies from 'js-cookie';
import "./HomePage.css"

const HomePage = () => {
  // const history = useHistory();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ product_name: '', product_description: '', productImage: null});
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (productId) => {
    setEditingProductId(productId);
    const productToEdit = products.find((product) => product.id === productId);
    setNewProduct({ ...productToEdit });
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('product_name', newProduct.product_name);
      formData.append('product_description', newProduct.product_description);
      formData.append('productImage', newProduct.productImage);

      const response = await fetch(`http://localhost:5000/products/${newProduct.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        fetchProducts();
        setEditingProductId(null);
        setNewProduct({ product_name: '', product_description: '', productImage: null });
      } else {
        console.error('Failed to save edit');
      }
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setNewProduct({ product_name: '', product_description: '', productImage: null });
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/products/4/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async () => {
    const authToken = Cookies.get("authToken");
    console.log("newProduct.productImage isss--",newProduct.productImage)
    let formData = new FormData();
    formData.append('product_name', newProduct.product_name);
    formData.append('product_description', newProduct.product_description);
    formData.append('productImage', newProduct.productImage);

    // console.log("form data ----",formData);

    try {
      const response = await fetch('http://localhost:5000/add-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization' :`Bearer ${}`
        },
        body: formData,
      });

      if (response.ok) {
        fetchProducts();
        setNewProduct({ product_name: '', product_description: '', productImage: null });
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // history.push("/")
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setNewProduct({ ...newProduct, productImage: file });
  };

  return (
    <>
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
                      {product.productImage && <img src={`http://localhost:5000/uploads/${product.productImage}`} alt={product.product_name} />}
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


