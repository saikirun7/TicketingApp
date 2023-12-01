import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import ListTickets from './components/tickets/ListTickets/ListTickets';
import AddTicket from './components/tickets/AddTicket/AddTicket';
import PrivateRoute from './RoutingGuards/PrivateRoute'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>
            <Route path="" element={<ListTickets />} />
            <Route path="listTickets" element={<ListTickets />} />
            <Route path="addTicket" element={<AddTicket />} />
          </ Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
