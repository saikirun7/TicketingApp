// Import necessary dependencies from react-router-dom
import { Route, Navigate, Routes } from 'react-router-dom';

import { getToken, tokenExpired } from '../services/authenticationApi';

const AuthGuard = ({ component: Component, ...rest }) => (
    <Routes>
  <Route
    {...rest}
    render={(props) =>
      tokenExpired(getToken()) ? (
        <Navigate to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
  </Routes>
);

export default AuthGuard;
