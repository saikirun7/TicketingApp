// EmployeeDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import TicketsApiService from '../../../services/TicketsApiService';
import './EmployeeDashboard.css'

function EmployeeDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [allUserTickets, setAllUserTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchAllUserTickets = async () => {
        const ticketsApiService = new TicketsApiService();
          try {
              const response = await ticketsApiService.getAllTickets();
              const data = response.data.userTickets;
              setAllUserTickets(data);
          } catch (error) {
              console.error('Error fetching all user tickets:', error);
              setError(error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchAllUserTickets();
  }, []);

  return (
    <div>
        <br />
        <Typography variant="h4" className="titleStyle">
            <center>Employee Dashboard</center>
        </Typography>
        {isLoading && <h4>Loading...</h4>}
        {!isLoading && (
                <ul>
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket Number</th>
                                <th>Email</th>
                                <th>Product Name</th>
                                <th>Issue</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(allUserTickets) && allUserTickets.length > 0 ? (
                                allUserTickets.map((userTicket, index) =>
                                    userTicket.tickets.map((ticket, ticketIndex) => (
                                        <tr key={`${index}-${ticketIndex}`}>
                                            <td>{index + 1}</td>
                                            <td>{userTicket.email}</td>
                                            <td>{ticket.product}</td>
                                            <td>{ticket.issue}</td>
                                            <td></td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan="5">No user tickets available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </ul>
            )}
        {error && <p>Error: {error.message}</p>}
    </div>
);
}

export default EmployeeDashboard;