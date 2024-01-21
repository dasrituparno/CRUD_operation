// import React, { useState, useEffect } from 'react';

// const HomePage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Assume a signup API that returns product data for the logged-in user
//     // Replace 'yourSignupApiEndpoint' with the actual API endpoint
//     fetch('yourSignupApiEndpoint')
//       .then((response) => response.json())
//       .then((data) => setProducts(data.products))
//       .catch((error) => console.error('Error fetching product data:', error));
//   }, []);

//   const handleEdit = (productId) => {
//     // Implement edit functionality here
//     console.log(`Edit product with id ${productId}`);
//   };

//   const handleDelete = (productId) => {
//     // Implement delete functionality here
//     console.log(`Delete product with id ${productId}`);
//   };

//   return (
//     <div>
//       <h1>Product List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Serial Number</th>
//             <th>Product Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.serialNumber}</td>
//               <td>{product.productName}</td>
//               <td>
//                 <button onClick={() => handleEdit(product.id)}>Edit</button>
//                 <button onClick={() => handleDelete(product.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default HomePage;


import React,{useState} from 'react';


import { Link, useNavigate } from 'react-router-dom';





const HomePage = () => {
  const [products, setProducts] = useState([
    { id: 1, serialNumber: 'SN001', productName: 'Product 1' },
    { id: 2, serialNumber: 'SN002', productName: 'Product 2' },
    { id: 3, serialNumber: 'SN003', productName: 'Product 3' },
    { id: 4, serialNumber: 'SN004', productName: 'Product 4' },
    { id: 5, serialNumber: 'SN005', productName: 'Product 5' },
  ]);

  const handleEdit = (productId) => {
    // Implement edit functionality here
    console.log(`Edit product with id ${productId}`);
  };

  const handleDelete = (productId) => {
    // Implement delete functionality here
    console.log(`Delete product with id ${productId}`);
  };

  return (
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
          {products.map((product) => (
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
    </div>
  );
};

export default HomePage;
