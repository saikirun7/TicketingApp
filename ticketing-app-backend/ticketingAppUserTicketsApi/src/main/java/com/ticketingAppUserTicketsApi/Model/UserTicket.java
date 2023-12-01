package com.ticketingAppUserTicketsApi.Model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class UserTicket {
	private String id;
	private String email;
	
	@DBRef
    private List<Ticket> tickets;

	public UserTicket(String id, String email, List<Ticket> tickets) {
		super();
		this.id = id;
		this.email = email;
		this.tickets = tickets;
	}

	public UserTicket() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	@Override
	public String toString() {
		return "UserTicket [id=" + id + ", email=" + email + ", tickets=" + tickets + "]";
	}
	
}
