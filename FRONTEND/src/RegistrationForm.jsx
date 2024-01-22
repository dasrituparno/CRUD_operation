// RegistrationForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './RegistrationValidation';
import './RegistrationForm.css';
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
    ) {
      // Use Axios to send registration data to the backend
      axios.post('http://localhost:5000/register', values)
        .then((res) => {
          console.log('Registration Response:', res.data);
          navigate('/'); // Redirect to login page after successful registration
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

          <button type='submit'>Register</button>

          <Link to='/' className='link'>
            {' '}
            Login{' '}
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
