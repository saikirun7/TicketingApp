import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import TicketsApiService from '../../../services/TicketsApiService';

function ListTickets() {
  const [isLoading, setIsLoading] = useState(true);
  const [userTickets, setUserTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const ticketsApiService = new TicketsApiService();

      try {
        const response = await ticketsApiService.getTickets();
        const data = response.data.tickets; // Access the tickets array
        console.log('Data:', data);
        setUserTickets(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <br />
      <Typography variant="h4">List of Tickets</Typography>
      {isLoading && <h4>Loading...</h4>}
      {!isLoading && (
        <ul>
          <table>
            <thead>
              <tr>
                <th>Ticket Number</th>
                <th>Product Name</th>
                <th>Issue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userTickets) && userTickets.length > 0 ? (
                userTickets.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <td>{index + 1}</td>
                    {/* <td>{ticket.id}</td> */}
                    <td>{ticket.product}</td>
                    <td>{ticket.issue}</td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No user tickets available.</td>
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

export default ListTickets;
