


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Validation from './RegistrationValidation';

// import './RegistrationForm.css';

// function RegistrationForm() {
//   const [values, setValues] = useState({
//     name: '',
//     email: '',
//     phone : '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleInput = (event) => {
//     setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrors(Validation(values));

//     if (
//       errors.name === '' &&
//       errors.email === '' &&
//       errors.phone === '' &&
//       errors.address === '' &&
//       errors.password === '' &&
//       errors.confirmpassword === ''
//     ) {
//       try {
//         const response = await fetch('http://localhost:5000/register', {
//           method: 'POST',
//           headers: {
//           'Content-Type' : 'application/json',
//           },
//           body: JSON.stringify(values),
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('Registration failed');
//         }

//         const data = await response.json();

//         console.log('Registration Response:', data);
//         navigate('/'); 
//       } catch (err) {
//         console.error('Registration failed:', err);
//       }
//     }
//   };

//   return (
//     <div>
//  <div className='container'>
//   <form onSubmit={handleSubmit}>
//   <h1> Sign Up</h1>
//     <label htmlFor='name'>Name</label>
//     <input
//       type='name'
//       placeholder='Enter Your Name'
//       name='name'
//       onChange={handleInput}
//     />
//     {errors.name && <span className='text-danger'>{errors.name}</span>}

//     <label htmlFor='email'>Email</label>
//     <input
//       type='email'
//       placeholder='Enter Email'
//       name='email'
//       onChange={handleInput}
//     />
//     {errors.email && <span className='text-danger'>{errors.email}</span>}

//     <label htmlFor='phone'>Mobile</label>
//     <input
//       type='number'
//       placeholder='Enter Your Mobile No'
//       name='phone'
//       onChange={handleInput}
//     />
//     {errors.phone && <span className='text-danger'>{errors.phone}</span>}

//     <label htmlFor='address'>Address</label>
//     <input
//       type='address'
//       placeholder='Enter Your Address'
//       name='address'
//       onChange={handleInput}
//     />
//     {errors.address && <span className='text-danger'>{errors.address}</span>}

//     <label htmlFor='password'>Password</label>
//     <input
//       type='password'
//       placeholder='Enter Password'
//       name='password'
//       onChange={handleInput}
//     />
//     {errors.password && <span className='text-danger'>{errors.password}</span>}

//     <label htmlFor='confirmpassword'>Confirm Password</label>
//     <input
//       type='password'
//       placeholder='Confirm Your Password'
//       name='confirmpassword'
//       onChange={handleInput}
//     />
//     {errors.confirmpassword && (
//       <span className='text-danger'>{errors.confirmpassword}</span>
//     )}

//     <button type='submit' onClick={handleSubmit}>Sign Up</button>

//     <Link to='/' className='link'> Login</Link>
//   </form>
//  </div>
//  </div>
//  );

// };

// export default RegistrationForm;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Validation from './RegistrationValidation';

// import './RegistrationForm.css';

// function RegistrationForm() {
//   const [values, setValues] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleInput = (event) => {
//     setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Validate the form fields
//     const formErrors = Validation(values);
//     setErrors(formErrors);

//     // If there are no validation errors, proceed with form submission
//     if (Object.keys(formErrors).every(key => formErrors[key] === '')) {
//       try {
//         const response = await fetch('http://localhost:5000/register', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json', // Corrected header
//           },
//           body: JSON.stringify(values),
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('Registration failed');
//         }

//         const data = await response.json();
//         console.log('Registration Response:', data);
//         navigate('/'); // Redirect to home page after successful registration
//       } catch (err) {
//         console.error('Registration failed:', err);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className='container'>
//         <form onSubmit={handleSubmit}>
//           <h1>Sign Up</h1>
//           <label htmlFor='name'>Name</label>
//           <input
//             type='text'
//             placeholder='Enter Your Name'
//             name='name'
//             value={values.name}
//             onChange={handleInput}
//           />
//           {errors.name && <span className='text-danger'>{errors.name}</span>}

//           <label htmlFor='email'>Email</label>
//           <input
//             type='email'
//             placeholder='Enter Email'
//             name='email'
//             value={values.email}
//             onChange={handleInput}
//           />
//           {errors.email && <span className='text-danger'>{errors.email}</span>}

//           <label htmlFor='phone'>Mobile</label>
//           <input
//             type='text'
//             placeholder='Enter Your Mobile No'
//             name='phone'
//             value={values.phone}
//             onChange={handleInput}
//           />
//           {errors.phone && <span className='text-danger'>{errors.phone}</span>}

//           <label htmlFor='address'>Address</label>
//           <input
//             type='text'
//             placeholder='Enter Your Address'
//             name='address'
//             value={values.address}
//             onChange={handleInput}
//           />
//           {errors.address && <span className='text-danger'>{errors.address}</span>}

//           <label htmlFor='password'>Password</label>
//           <input
//             type='password'
//             placeholder='Enter Password'
//             name='password'
//             value={values.password}
//             onChange={handleInput}
//           />
//           {errors.password && <span className='text-danger'>{errors.password}</span>}

//           <label htmlFor='confirmPassword'>Confirm Password</label>
//           <input
//             type='password'
//             placeholder='Confirm Your Password'
//             name='confirmPassword'
//             value={values.confirmPassword}
//             onChange={handleInput}
//           />
//           {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}

//           <button  onClick={handleSubmit}>Sign Up</button>
//           <Link to='/' className='link'>Login</Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegistrationForm;
// Signup.js
// import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';


// const Signup = () => {
//   const [fname, setFName] = useState('');
//   const [lname, setLName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   // const handleFileChange = (e) => {
//   //   console.log('Selected file:', e.target.files[0]);
//   // };

  

//   // Handle signup logic
//   const handleSignup = async () => {
//     const confirmpassword = confirmPassword;
//     const firstname = fname;
//     const lastname = lname;

//     try {
//       // Make an API call to register the new user
//       const response = await fetch('http://127.0.0.1:8000/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ firstname, lastname, email, password, confirmpassword }),
//       });

//       if (response.ok) {
//         console.log('User registered successfully');
//         const data = await response.json();
//         console.log('Setting authToken cookie:', data.token);
        
//         console.log(data.token);
       
//         Cookies.set('authToken', data.token);
//         redirectToUserListPage();
//       } else {
//         // Registration failed, handle error
//         console.error('User registration failed');
//       }
//     } catch (error) {
//       console.error('Error during user registration:', error);
//     }
//   };

//   const redirectToUserListPage = () => {
//     window.location.href = "/userList";
//   };

 

//   return (
//     <div className="signup-container">
//       <h2>Signup</h2>
//       <form>
//         <label className="signup-label">FirstName:</label>
//         <input type="text" className="signup-input" value={fname} onChange={(e) => setFName(e.target.value)} placeholder='firstname' />
//         <br />
//         <label className="signup-label">LastName:</label>
//         <input type="text" className="signup-input" value={lname} onChange={(e) => setLName(e.target.value)} placeholder='lastname' />
//         <br />
//         <label className="signup-label">Email:</label>
//         <input type="text" className="signup-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='exam@gmail.com'/>
//         <br />
//         <label className="signup-label">Password:</label>
//         <input type="password" className="signup-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
//         <br />
//         <label className="signup-label">Confirm Password:</label>
//         <input
//           type="password"
//           className="signup-input"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder='confirmpassword'
//         />
        
//         <button type="button" className="signup-button" onClick={handleSignup}> 
//         <span className="signup_links">Signup</span>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


// Signup.js

import React, { useState } from 'react';
import Cookies from 'js-cookie';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    // const confirmPass = confirmPassword;

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, address, phone, password, confirmPassword }),
      });

      if (response.ok) {
        console.log('User registered successfully');
        const data = await response.json();
        console.log('Setting authToken cookie:', data.token);
        Cookies.set('authToken', data.token);
        redirectToUserListPage();
      } else {
        console.error('User registration failed');
      }
    } catch (error) {
      console.error('Error during user registration:', error);
    }
  };

  const redirectToUserListPage = () => {
    window.location.href = "/";
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form>
        <label className="signup-label">Name:</label>
        <input type="text" className="signup-input" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
        <br />
        <label className="signup-label">Email:</label>
        <input type="text" className="signup-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='exam@gmail.com'/>
        <br />
        <label className="signup-label">Address:</label>
        <input type="text" className="signup-input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
        <br />
        <label className="signup-label">Phone:</label>
        <input type="text" className="signup-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Mobile Number' />
        <br />
        <label className="signup-label">Password:</label>
        <input type="password" className="signup-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <br />
        <label className="signup-label">Confirm Password:</label>
        <input
          type="password"
          className="signup-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
        />
        
        <button type="button" className="signup-button" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
