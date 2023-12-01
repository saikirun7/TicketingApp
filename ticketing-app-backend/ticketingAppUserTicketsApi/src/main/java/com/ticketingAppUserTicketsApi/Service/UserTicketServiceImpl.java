package com.ticketingAppUserTicketsApi.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticketingAppUserTicketsApi.Model.Ticket;
import com.ticketingAppUserTicketsApi.Model.UserTicket;
import com.ticketingAppUserTicketsApi.Repository.TicketRepository;
import com.ticketingAppUserTicketsApi.Repository.UserTicketRepository;

@Service
public class UserTicketServiceImpl implements UserTicketService {
	
	@Autowired
    private TicketRepository ticketRepository;
	
	@Autowired
    private UserTicketRepository userTicketRepository;

	
    public Ticket addTicket(Ticket ticket) {
        // Save the ticket directly
        return ticketRepository.save(ticket);
    }

  //  Add User to User Ticket
  public UserTicket addUserToUserTicket(String email) {
	  UserTicket user = new UserTicket();
  	user.setEmail(email);
  	return userTicketRepository.save(user);
  }
  
//Get All Tickets Of User
public List<Ticket> getAllTicketsOfUser(String email){
	UserTicket userTicket = userTicketRepository.findByEmail(email);
	if(userTicket==null) {
		userTicket = addUserToUserTicket(email);
	}
	return userTicket.getTickets();
}

//Add Ticket Of User
public boolean addTicketOfUser(String email, Ticket ticket) {
 UserTicket userTicket = userTicketRepository.findByEmail(email);

 // If no user exists, create a new user
 if (userTicket == null) {
     UserTicket newUserTickets = new UserTicket();
     List<Ticket> ticketsOfNewUser = new ArrayList<>();
     ticketsOfNewUser.add(addTicket(ticket));
     newUserTickets.setEmail(email);
     newUserTickets.setTickets(ticketsOfNewUser);
     userTicketRepository.save(newUserTickets);
     return true; // User was created, and the ticket was added
 } else {
     // User already exists, add the ticket directly
     userTicket.getTickets().add(addTicket(ticket));
     userTicketRepository.save(userTicket);
     return true; // Ticket was added
 }
}


}
