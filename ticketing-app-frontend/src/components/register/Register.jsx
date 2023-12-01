import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, CircularProgress } from '@mui/material';
import './Register.css';
import { register } from '../../services/authenticationApi';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: 'customer',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
        const { confirmPassword, ...dataWithoutConfirmPassword } = values;
      
        try {
          setLoading(true);
      
          const response = await register(dataWithoutConfirmPassword);
      
          console.log('Response:', response); // Log the entire response object
      
          if (response.message === 'User Registered Successfully') {
            console.log('Registration successful:', response);
            navigate('/login');
          } else {
            console.error('Registration failed. Response:', response);
            alert(`Registration failed: ${response.message}`);
          }          
        } catch (error) {
          console.error('Registration error:', error);
          alert('An unexpected error occurred. Please try again.');
        } finally {
          setLoading(false);
        }
      },
  });

  return (
    <div>
      <div className='register-form'>
        <h1 className='register-head'>Register</h1>
        <form onSubmit={registerForm.handleSubmit} className='form'>
          <div>
            <TextField
              className='TextField'
              type='text'
              name='name'
              label='Name'
              placeholder='Enter Name'
              required
              onChange={registerForm.handleChange}
              value={registerForm.values.name}
              onBlur={registerForm.handleBlur}
            />
          </div>
          <br />
          <div>
            <TextField
              className='TextField'
              type='email'
              name='email'
              label='Email'
              placeholder='Enter Email'
              required
              onChange={registerForm.handleChange}
              value={registerForm.values.email}
              onBlur={registerForm.handleBlur}
            />
          </div>
          <br />
          <div>
            <TextField
              className='TextField'
              type='password'
              name='password'
              label='Password'
              placeholder='Enter Password'
              required
              onChange={registerForm.handleChange}
              value={registerForm.values.password}
              onBlur={registerForm.handleBlur}
            />
          </div>
          <br />
          <div>
            <TextField
              className='TextField'
              type='password'
              name='confirmPassword'
              label='Confirm Password'
              placeholder='Enter Password'
              required
              onChange={registerForm.handleChange}
              value={registerForm.values.confirmPassword}
              onBlur={registerForm.handleBlur}
            />
          </div>
          <br />
          <div className='register-btn'>
            <Button type='submit' disabled={loading}>
              {loading ? <CircularProgress size={24} color="primary" /> : 'Register'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
