import React from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { login, setToken, setRole, setId } from '../../services/authenticationApi';

const Login = () => {
  const navigate = useNavigate();
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await login(values);

        if (response.message === "User Successfully LoggedIn") {
          console.log('Login successful:', response);
          setToken(response.token);
          setRole(response.role);
          setId(response.userId)
          navigate('/dashboard');
        } else {
          console.error('Login failed. Response:', response);
          alert(`Login failed: ${response.message}`);
        }
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
  });

  return (
    <div>
      <div className='login-form'>
        <h1 className='login-head'>Login</h1>
        <form onSubmit={loginForm.handleSubmit} className='form'>
          <div>
            <TextField
              className='TextField'
              type='text'
              name='email'
              label='Email'
              placeholder='Enter Email'
              required
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
              onBlur={loginForm.handleBlur}
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
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              onBlur={loginForm.handleBlur}
            />
          </div>
          <br />
          <div className='login-btn'>
            <Button type='submit'>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
