// TicketsApiService.js
import axios from 'axios';
import { getToken } from './authenticationApi'

class TicketsApiService {
  baseUrl = 'http://localhost:9090/api/';

  getTickets() {
    const finalUrl = `${this.baseUrl}ticketsdata`;
    const headers = this.getHeader();

    return axios.get(finalUrl, { headers });
  }

  addTicket(ticket) {
    const finalUrl = `${this.baseUrl}ticketsdata`;
    const headers = this.getHeader();

    return axios.post(finalUrl, ticket, { headers });
  }

  getHeader() {
    const headers = {
      'Content-Type': 'application/json',
       Authorization: `Bearer ${getToken()}`,
    };
    return headers;
  }

}

export default TicketsApiService;
