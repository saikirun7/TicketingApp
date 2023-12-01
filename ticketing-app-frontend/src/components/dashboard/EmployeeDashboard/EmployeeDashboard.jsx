import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import './EmployeeDashboard.css';

function EmployeeDashboard() {
  const [userData, setUserData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(window.localStorage.getItem('user'));
        setUserData(user[0]);
        const response = await axios.get('https://ticketing-app-backend.onrender.com/tickets');
        const data = response.data;
        setTickets(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleForwardToServiceTeam = (ticketId) => {
    // Add logic to forward the ticket to the service team
    console.log(`Forwarding ticket ${ticketId} to the service team`);
  };

  const handleCloseTicket = (ticketId) => {
    // Add logic to close the ticket
    console.log(`Closing ticket ${ticketId}`);
  };

  return (
    <div>
      <Box className="panelStyle">
        <Typography variant="h4" className="titleStyle">
          <center>Employee Dashboard</center>
        </Typography>
        <Typography variant="h6">
          <center>Welcome, {userData && userData.username}</center>
        </Typography>
        <Typography variant="p">List of Tickets</Typography>

        {isLoading && <h4>Loading...</h4>}
        {!isLoading && (
          <ul>
            <table>
              <thead>
                <tr>
                  <th>Ticket Number</th>
                  <th>Customer ID</th>
                  <th>Product Name</th>
                  <th>Issue</th>
                  <th>Forward to Service Team</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.customerId}</td>
                    <td>{ticket.productName}</td>
                    <td>{ticket.issue}</td>
                    <td>
                      <Button onClick={() => handleForwardToServiceTeam(ticket.id)}>
                        Forward to Service Team
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => handleCloseTicket(ticket.id)}>Close Ticket</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        )}
      </Box>
    </div>
  );
}

export default EmployeeDashboard;
