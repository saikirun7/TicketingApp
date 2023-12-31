import React, { useState } from 'react';
import { AppBar, Box, Button, Snackbar, Toolbar, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeToken, removeRole, removeName } from '../../services/AuthenticationApi';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const dashboard = () => {
    navigate('/dashboard');
  };

  const logout = () => {
    removeToken('jwtToken');
    removeRole('userRole');
    removeName('userName');
    setSnackbarMessage('User logged out successfully.');
    setOpenSnackbar(true);
    navigate('/login');
  };

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderLoginButton = () => {
    if (location.pathname === '/register') {
      return (
        <Link to="/login">
          <Button type="button" className="login-button">
            Login
          </Button>
        </Link>
      );
    }
    return null;
  };

  const renderRegisterButton = () => {
    if (location.pathname === '/login') {
      return (
        <Link to="/register">
          <Button type="button" className="register-button">
            Register
          </Button>
        </Link>
      );
    }
    return null;
  };

  const renderDashboardButton = () => {
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      return (
        <Button type="button" className="mx-1" onClick={dashboard}>
          Dashboard
        </Button>
      );
    }
    return null;
  };

  const renderLogoutButton = () => {
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      return (
        <Button type="button" className="mx-1" onClick={logout}>
          Logout
        </Button>
      );
    }
    return null;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#fff' /* specify your desired background color */ }}>
        <Toolbar className="Toolbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000' /* specify your desired text color */ }}>
            Ticketing App...
          </Typography>

          {renderLoginButton()}
          {renderRegisterButton()}

          <div className="nav-buttons">
            {renderDashboardButton()}
            {renderLogoutButton()}
          </div>
        </Toolbar>
      </AppBar>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
}

export default Navbar;
