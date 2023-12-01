import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { login, setToken, setRole, setId } from '../../services/authenticationApi';
import './Login.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = ({ open, onClose, severity = 'success', message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const closeSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const response = await login(values);

        if (!response.error) {
          setToken(response.token);
          setRole(response.role);
          setId(response.userId);

          setSnackbarSeverity('success');
          setSnackbarMessage( response.message + ', Redirecting to dashboard...');
          setOpenSnackbar(true);

          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          console.error('Login failed. Response:', response);
          setSnackbarSeverity('error');
          setSnackbarMessage(response.message || 'Login failed. Please try again.');
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error('Login failed:', error.message);
        setSnackbarSeverity('error');
        setSnackbarMessage('An unexpected error occurred. Please try again.');
        setOpenSnackbar(true);
      }
    },
    [navigate]
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <div className='login-form'>
        <h1 className='login-head'>Login</h1>
        <form onSubmit={formik.handleSubmit} className='form'>
          <div>
            <TextField
              className='TextField'
              type='text'
              name='email'
              label='Email'
              placeholder='Enter Email'
              required
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
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
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </div>
          <br />
          <div className='login-btn'>
            <Button type='submit'>Login</Button>
          </div>
        </form>
      </div>

      <CustomizedSnackbars
        open={openSnackbar}
        onClose={closeSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Login;
