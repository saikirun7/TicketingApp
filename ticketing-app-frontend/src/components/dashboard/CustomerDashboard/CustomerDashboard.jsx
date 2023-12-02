import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

function CustomerDashboard() {

  const name = localStorage.getItem('userName');

  return (
    <div>
      <Box className="panelStyle">
        <Typography variant="h4" className="titleStyle">
          <center>Customer Dashboard</center>
        </Typography>
        <Typography variant="h6">
          <center>Welcome, {name}</center>
        </Typography>
        <Link to="listTickets">
          <Button variant="contained" color="primary">
            List of Tickets
          </Button>
        </Link>
        <Link to="addTicket">
          <Button variant="contained" color="primary">
            Raise Ticket
          </Button>
        </Link>
        <Outlet />
      </Box>
    </div>
  )
}

export default CustomerDashboard