// import React,{useState} from 'react'
// import { Link } from 'react-router-dom';
// import Validation from './LoginValidation';
// import './index.css'

// function LoginPage() {
//   const [values, setValues] = useState({
//     email:" ",
//     password:" "
//   })

//   const handleInput=(event) =>{
//     setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
//   }
// const [errors,setErrors]= useState({})
//   const handleSubmit=(event)=>{
//     event.preventDefault();
//     setErrors(Validation(values));
//   };
//   return (
//     <div className='d-flex justify-content-center  align-items-center bg-primary vh-100'>
//       <div className='bg-white p-3 rounded w-25'>
//         <form action='' onSubmit={handleSubmit}>
//          <div className='mb-3'>
//          <label htmlFor='email'> email </label>
//          <input type="email" placeholder='Enter Email' name='email'
//          onChange={handleInput} className='form-control rounded-0'/>
//          {errors.email && <span className='text-danger'>{errors.email}</span>}
//         </div>
//         <div className='mb-3'>
//          <label htmlFor='password'> password </label>
//          <input type="password" placeholder='Enter Password' name='password'
//          onChange={handleInput}  className='form-control rounded-0'/>
//          {errors.password && <span className='text-danger'>{errors.password}</span>}
//         </div>
//         <button type='submit' className='btn btn-success w-100 rounded-0 '>Log in</button>
//         <p> Don't Have Account?</p>
//         <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'> Sign Up Here</Link>
//       </form>
//       </div>
//     </div>
//   )
// }

// export default LoginPage;
// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Validation from './LoginValidation';
// import "./LoginPage.css";

// function LoginPage() {
//   const [values, setValues] = useState({
//     email: "",
//     password: ""
//   });

//   const handleInput = (event) => {
//     setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setErrors(Validation(values));
//     if (
//       errors.email === '' &&
//       errors.password === '' 
     
//      ){
//       axios.post('http://localhost:5000/login',values)
//       .then((res) => {
//         console.log('Login Response:', res.data);
//         navigate('/home'); 
//       })

//       .catch(err => console.log(err));

//     }
//   };

//   return (
// <>

//     <div className='container'>
    
//       <div className='form-container'>
//       <h1> LOGIN</h1>
//         <form action='' onSubmit={handleSubmit}>
//           <div className='form-group'>
//             <label htmlFor='email' className='label'>Email</label>
//             <input
//               type="email"
//               placeholder='Enter Email'
//               name='email'
//               onChange={handleInput}
//               className='input'
//             />
//             {errors.email && <span className='error'>{errors.email}</span>}
//           </div>
//           <div className='form-group'>
//             <label htmlFor='password' className='label'>Password</label>
//             <input
//               type="password"
//               placeholder='Enter Password'
//               name='password'
//               onChange={handleInput}
//               className='input'
//             />
//             {errors.password && <span className='error'>{errors.password}</span>}
//           </div>
//           <button type='submit' className='button'>Log in</button>
//           <p>Don't Have Account?</p>
//           <Link to="/signup" className='link'>Sign Up Here</Link>
//         </form>
//       </div>
//     </div>
// </>
//   );
// }

// export default LoginPage;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Validation from './LoginValidation';
// import Cookies from 'js-cookie';
// import './LoginPage.css';

// function LoginPage() {
//   const [values, setValues] = useState({
//     email: '',
//     password: '',
//   });

//   const handleInput = (event) => {
//     setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     // Check if the JWT cookie exists and navigate to the home page if present
//     const jwtCookie = Cookies.get('accessToken');
//     if (jwtCookie) {
//       navigate('/home');
//     }
//   }, [navigate]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrors(Validation(values));

//     if (errors.email === '' && errors.password === '') {
//       try {
//         const response = await fetch('http://127.0.0.1:5000/login', {
//           method: 'POST',
//           headers: {
//           ContentType: 'application/json',
//           },
//           body: JSON.stringify(values),
//           credentials: 'include',
//         });
//         console.log(response);
//         if (!response.ok) {
//           throw new Error('Login failed');
//         }
//         Cookies.set('accessToken', data.token, { expires: new Date(data.expiryDate)});

//         const data = await response.json();
//         console.log('Login Response:', data);
//         navigate('/home');
//       } catch (err) {
//         console.error('Login failed:', err);
//       }
//     }
//   };

//   return (
//     <>

//     <div className='container'>
    
//       <div className='form-container'>
//       <h1> LOGIN</h1>
//         <form action='' onSubmit={handleSubmit}>
//           <div className='form-group'>
//             <label htmlFor='email' className='label'>Email</label>
//             <input
//               type="email"
//               placeholder='Enter Email'
//               name='email'
//               onChange={handleInput}
//               className='input'
//             />
//             {errors.email && <span className='error'>{errors.email}</span>}
//           </div>
//           <div className='form-group'>
//             <label htmlFor='password' className='label'>Password</label>
//             <input
//               type="password"
//               placeholder='Enter Password'
//               name='password'
//               onChange={handleInput}
//               className='input'
//             />
//             {errors.password && <span className='error'>{errors.password}</span>}
//           </div>
//           <button type='submit' className='button' onClick={handleSubmit}>Log in</button>
//           <p>Don't Have Account?</p>
//           <Link to="/signup" className='link'>Sign Up Here</Link>
//         </form>
//       </div>
//     </div>
// </>
//   );
    
// }

// export default LoginPage;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
 
// // const getAuthToken = () => {
// //   return Cookies.get('authToken');
// // };
 
 
// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
 
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
     
//       const response = await fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
         
//         },
//         body: JSON.stringify({ email, password }),
//       });
     
//       if (response.ok) {
//         // Set a cookie upon successful login
//         console.log("login successfull");
//         const data = await response.json();
//         console.log('Setting authToken cookie:', data.token);
       
//         console.log(data.token);
       
//         Cookies.set('authToken', data.token);
 
 
//         window.location.href = '/home';
//         // Add any other necessary logic for successful login
//         // console.log('Logged in successfully');
//       } else {
//         // Handle authentication failure
//         console.error('Login failed');
//         alert('wrong credential...');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };
 
 
 
//    return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <div className="input-container">
//         <label>Email:</label>
//         <input
//           type="email"
//           placeholder="exam@gmail.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="input-container">
//         <label>Password:</label>
//         <input
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button onClick={handleLogin}>Login</button>

//       <div className="signup-link">
//         Don't have an account? <Link to="/signup">Create an Account</Link>
//       </div>
//     </div>
//   );
// };
 
 
 
// export default LoginPage;


import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import Cookies from 'js-cookie';
 
// const getAuthToken = () => {
//   return Cookies.get('authToken');
// };
 
 
const LoginPage = () => {

  // const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({ email, password }),
      });
     
      if (response.ok) {
        const data = await response.json();
        console.log('Received token:', data.token);
        // history.push("/HomePage");

        // setting cookie
        Cookies.set('authToken', data.token);
        console.log("authToken cookie:" , Cookies.get('authToken'));


 
 
        window.location.href = '/HomePage';

      } else {
        // Handle authentication failure
        console.error('Login failed');
        alert('wrong credential...');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
 
 
 
   return (
    <div className="login-container">
      <h2>Login</h2>
       <div className="input-container">
        <label>Email:</label>
        <input
          type="email"
          placeholder="exam@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>

      <div className="signup-link">
        Don't have an account? <Link to="/signup">Create an Account</Link>
      </div>
    </div>
  );
};
 
 
 
export default LoginPage;
