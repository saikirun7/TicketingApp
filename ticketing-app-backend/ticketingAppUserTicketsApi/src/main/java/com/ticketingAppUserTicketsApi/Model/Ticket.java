package com.ticketingAppUserTicketsApi.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Ticket {
	
	private String id;
    private String product;
    private String issue;

    public Ticket(String id, String product, String issue) 
    {
        this.id = id;
        this.product = product;
        this.issue = issue;
    }
    
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public String getIssue() {
		return issue;
	}

	public void setIssue(String issue) {
		this.issue = issue;
	}

	@Override
	public String toString() {
		return "Ticket [id=" + id + ", product=" + product + ", issue=" + issue + "]";
	}

}

