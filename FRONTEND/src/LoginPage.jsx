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
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import "./LoginPage.css";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (
      errors.email === '' &&
      errors.password === '' 
     
     ){
      axios.post('http://localhost:5000/login',values)
      .then((res) => {
        console.log('Login Response:', res.data);
        navigate('/home'); // Redirect to products page after successful login
      })

      .catch(err => console.log(err));

    }
  };

  return (
<>

    <div className='container'>
    
      <div className='form-container'>
      <h1> LOGIN</h1>
        <form action='' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email' className='label'>Email</label>
            <input
              type="email"
              placeholder='Enter Email'
              name='email'
              onChange={handleInput}
              className='input'
            />
            {errors.email && <span className='error'>{errors.email}</span>}
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='label'>Password</label>
            <input
              type="password"
              placeholder='Enter Password'
              name='password'
              onChange={handleInput}
              className='input'
            />
            {errors.password && <span className='error'>{errors.password}</span>}
          </div>
          <button type='submit' className='button'>Log in</button>
          <p>Don't Have Account?</p>
          <Link to="/signup" className='link'>Sign Up Here</Link>
        </form>
      </div>
    </div>
</>
  );
}

export default LoginPage;
