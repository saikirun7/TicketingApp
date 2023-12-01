package com.ticketingAppUserTicketsApi.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.ticketingAppUserTicketsApi.Model.Ticket;

public interface TicketRepository extends MongoRepository<Ticket, String> {
    
	public Ticket findByproduct(String product);
	
}
