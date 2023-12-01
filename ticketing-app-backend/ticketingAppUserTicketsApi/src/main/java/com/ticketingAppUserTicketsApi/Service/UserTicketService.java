package com.ticketingAppUserTicketsApi.Service;

import java.util.List;

import com.ticketingAppUserTicketsApi.Model.Ticket;
import com.ticketingAppUserTicketsApi.Model.UserTicket;

public interface UserTicketService {
	
	public Ticket addTicket(Ticket ticket);
	public UserTicket addUserToUserTicket(String email);
	public List<Ticket> getAllTicketsOfUser(String email);
	public boolean addTicketOfUser(String email, Ticket ticket);

}
