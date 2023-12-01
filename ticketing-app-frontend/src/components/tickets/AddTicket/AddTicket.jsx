import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import TicketsApiService from '../../../services/TicketsApiService';
import { useNavigate } from 'react-router-dom';

function AddTicket() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const ticketApiService = new TicketsApiService();

  const ticketForm = useFormik({
    initialValues: {
      product: '',
      issue: '',
    },
    onSubmit: async (values) => {
      try {
        // Make a POST request using TicketsApiService
        const response = await ticketApiService.addTicket(values);

        // Handle the response as needed
        alert(JSON.stringify(response.data));
        navigate("/dashboard/listTickets")
        // You might want to redirect or do something else here
      } catch (err) {
        // Handle errors
        setError('Failed to add the ticket. Please try again later.');
      }
    },
  });

  return (
    <div>
      <br />
      <Typography variant="h4">Add Ticket</Typography>
      <form onSubmit={ticketForm.handleSubmit}>
        <br />
        <div>
          <label htmlFor="product">Product</label>
          <select
            className="TextField"
            name="product"
            onChange={ticketForm.handleChange}
            required
          >
            <option value="">Select a product</option>
            <option value="Mobile Phone">Mobile Phone</option>
            <option value="TV">TV</option>
            <option value="Chimney">Chimney</option>
            <option value="Washing Machine">Washing Machine</option>
            <option value="Fridge">Fridge</option>
          </select>
        </div>
        <br />
        <div>
          Issue: <br /> <br />
          <TextField
            className="TextField"
            type="text"
            name="issue"
            label="Enter Issue"
            placeholder="Enter Issue"
            required
            onChange={ticketForm.handleChange}
          />
        </div>
        <br />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit">Add Ticket</Button>
      </form>
    </div>
  );
}

export default AddTicket;
