import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import TicketsApiService from '../../../services/TicketsApiService';
import { useNavigate } from 'react-router-dom';

function AddTicket() {
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const ticketApiService = new TicketsApiService();

  const ticketForm = useFormik({
    initialValues: {
      product: '',
      issue: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await ticketApiService.addTicket(values);

        if (response.status === 201) {
          setSnackbarSeverity('success');
          setSnackbarMessage(`Ticket Added: ${response.data.message}`);
          setOpenSnackbar(true);

          setTimeout(() => {
            navigate('/dashboard/listTickets');
          }, 1000);
        } else {
          setSnackbarSeverity('error');
          setSnackbarMessage(`Failed to add the ticket. Server returned: ${response.status} ${response.statusText}`);
          setOpenSnackbar(true);
        }
      } catch (err) {
        setError('Failed to add the ticket. Please try again later.');
        setOpenSnackbar(true);
      }
    },
  });

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddTicket;
