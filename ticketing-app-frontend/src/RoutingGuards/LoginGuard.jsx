import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { getToken, tokenExpired } from '../services/authenticationApi';

const LoginGuard = ({ component: Component, ...rest }) => (
  <Routes>
    <Route
      {...rest}
      element={
        tokenExpired(getToken()) ? (
          <Component />
        ) : (
          <Navigate to="/dashboard" replace />
        )
      }
    />
  </Routes>
);

export default LoginGuard;
