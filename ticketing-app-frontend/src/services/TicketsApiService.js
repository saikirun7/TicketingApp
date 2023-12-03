import axios from 'axios';
import { getToken } from './AuthenticationApi'

class TicketsApiService {
  baseUrl = 'http://localhost:8088/api/';

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

  getAllTickets() {
    const finalUrl = `${this.baseUrl}allticketsdata`;
    const headers = this.getHeader();

    return axios.get(finalUrl, { headers });
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
