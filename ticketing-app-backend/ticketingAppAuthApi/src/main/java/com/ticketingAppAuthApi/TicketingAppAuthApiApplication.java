package com.ticketingAppAuthApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@EntityScan
@SpringBootApplication
public class TicketingAppAuthApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketingAppAuthApiApplication.class, args);
		System.out.println("Ticketing App Api Begins...");
	}

}
