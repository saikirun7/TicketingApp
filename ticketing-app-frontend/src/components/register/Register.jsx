import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, CircularProgress, Snackbar } from '@mui/material';
import './Register.css';
import { register } from '../../services/authenticationApi';
import MuiAlert from '@mui/material/Alert';

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

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const closeSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

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

        console.log('Response:', response);

        if (response.message === 'User Registered Successfully') {
          console.log('Registration successful:', response);
          setSnackbarSeverity('success');
          setSnackbarMessage(response.message + ', Redirecting to login...');
          setOpenSnackbar(true);

          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          console.error('Registration failed. Response:', response);
          setSnackbarSeverity('error');
          setSnackbarMessage(response.message || 'Registration failed. Please try again.');
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error('Registration error:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('An unexpected error occurred. Please try again.');
        setOpenSnackbar(true);
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

      <CustomizedSnackbars
        open={openSnackbar}
        onClose={closeSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default Register;
