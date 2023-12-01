package com.ticketingAppUserTicketsApi.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ticketingAppUserTicketsApi.Model.UserTicket;

@Repository
public interface UserTicketRepository extends MongoRepository<UserTicket,String> {
	
	public UserTicket findByEmail(String email);
}