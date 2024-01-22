// import React, { useState } from 'react';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     photo: null,
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     // If the input is a file input, use files property to get the file
//     const inputValue = type === 'file' ? e.target.files[0] : value;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: inputValue,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform validation
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     // Create FormData object to send files as multipart/form-data
//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('email', formData.email);
//     formDataToSend.append('photo', formData.photo);
//     formDataToSend.append('password', formData.password);
//     formDataToSend.append('confirmPassword', formData.confirmPassword);

//     // Perform CRUD operation (e.g., send data to backend API)
//     // For simplicity, we'll just log the data to the console in this example.
//     console.log('Form Data:', formDataToSend);

//     // You can make a fetch request to your backend API here.
//     // Example:
//     // fetch('/api/register', {
//     //   method: 'POST',
//     //   body: formDataToSend,
//     // })
//     //   .then(response => response.json())
//     //   .then(data => console.log('Server Response:', data))
//     //   .catch(error => console.error('Error:', error));
//   };

//   return (
//     <div>
//       <h1>User Registration </h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Photo:</label>
//           <input type="file" name="photo" onChange={handleChange} accept="image/*" />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;


// import React,{useState,useEffect} from 'react';
// import LoginPage from './LoginPage';

// import { Link, useNavigate } from 'react-router-dom';
// import Validation from './RegistrationValidation';
// import './styles.css'
// import { useHistory } from 'react-router-dom';



// function RegistrationForm() {
//   const [values, setValues] = useState({
//     name:" ",
//     email:" ",
//     number:" ",
//     password:" ",
//     confirmpassword:" "
//   })

//   const handleInput=(event) =>{
//     setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
//   }
//   const navigate = useNavigate()
//   const [errors,setErrors]= useState({})
//   const handleSubmit=(event)=>{
//     event.preventDefault();
//     setErrors(Validation(values));
//     // if (errors.name ===" " && errors.email ===" " && errors.number ===" " 
//     // && errors.password ===" " && errors.confirmpassword ===" " ){
//     //   navigate('/home');
//     // }

     
//   };
//   useEffect(() => {
//     // Check for errors in the state after it has been updated
//     if (
//       errors.name === "" &&
//       errors.email === "" &&
//       errors.number === "" &&
//       errors.password === "" &&
//       errors.confirmpassword === ""
//     ) {
//       // Use navigate to redirect to the '/home' route
//       navigate('/home');
//     }
//   }, [errors]);

//   return (
//     <div>
//       <div className='d-flex justify-content-center  align-items-center bg-primary vh-100'>
//        <div className='bg-white p-3 rounded w-25'>
//          <form action='' onSubmit={handleSubmit}>
//             <div className='mb-3'>
//               <label htmlFor='name'> Name </label>
//               <input type="name" placeholder='Enter Your Name' 
//                name="name" 
//                onChange={handleInput} className='form-control rounded-0'/>
//                {errors.name && <span className='text-danger'>{errors.name}</span>}
//             </div>
//            <div className='mb-3'>
//              <label htmlFor='email'> Email </label>
//              <input type="email" placeholder='Enter Email'
//              name="email" 
//              onChange={handleInput} className='form-control rounded-0'/>
//              {errors.email && <span className='text-danger'>{errors.email}</span>}
//            </div>
//            <div className='mb'>
//              <label htmlFor='number'> Mobile </label>
//              <input type="number" placeholder='Enter Your Mobile No'
//              name='number'
//              onChange={handleInput} className='form-control rounded-0'/>
//              {errors.number && <span className='text-danger'>{errors.number}</span>}
//            </div>
//            <div className='mb'>
//              <label htmlFor='password'> password </label>
//              <input type="password" placeholder='Enter Password'
//              name='password'
//              onChange={handleInput} className='form-control rounded-0'/>
//              {errors.password && <span className='text-danger'>{errors.password}</span>}
//            </div>
//            <div className='mb'>
//              <label htmlFor='confirmpassword'> confirmPassword </label>
//              <input type="confirmpassword" placeholder='Confirm Your Password'
//              name='confirmpassword' 
//              onChange={handleInput} className='form-control rounded-0'/>
//              {errors.confirmpasswordpassword && <span className='text-danger'>{errors.confirmpassword}</span>}
//            </div>
//            <button type='submit' onClick={() => navigate('/home')} className='btn btn-success'>Register</button>
//            <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
//           </form>
//         </div>
//      </div>
      
//     </div>
//   )
// };

// export default RegistrationForm;





// RegistrationForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './RegistrationValidation';

import axios from 'axios';

function RegistrationForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    confirmpassword: '',
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
      errors.name === '' &&
      errors.email === '' &&
      errors.number === '' &&
      errors.password === '' &&
      errors.confirmpassword === ''
    ){
      axios.post('"localhost:5000/register',values)
      .then(res=> {
        navigate("./");
      })
      .catch(err => console.log(err));

    }
  };



  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            type='name'
            placeholder='Enter Your Name'
            name='name'
            onChange={handleInput}
          />
          {errors.name && <span className='text-danger'>{errors.name}</span>}

          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Enter Email'
            name='email'
            onChange={handleInput}
          />
          {errors.email && <span className='text-danger'>{errors.email}</span>}

          <label htmlFor='number'>Mobile</label>
          <input
            type='number'
            placeholder='Enter Your Mobile No'
            name='number'
            onChange={handleInput}
          />
          {errors.number && <span className='text-danger'>{errors.number}</span>}
          <label htmlFor='address'>Address</label>
          <input
            type='address'
            placeholder='Enter Your Address'
            name='address'
            onChange={handleInput}
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter Password'
            name='password'
            onChange={handleInput}
          />
          {errors.password && <span className='text-danger'>{errors.password}</span>}

          <label htmlFor='confirmpassword'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm Your Password'
            name='confirmpassword'
            onChange={handleInput}
          />
          {errors.confirmpassword && (
            <span className='text-danger'>{errors.confirmpassword}</span>
          )}

          <button type='submit' >Register</button>

          <Link to='/' className='link'> Login </Link>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;




