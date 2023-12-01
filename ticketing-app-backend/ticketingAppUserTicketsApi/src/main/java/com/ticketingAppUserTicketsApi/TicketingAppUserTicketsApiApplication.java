/*******************************************************
Developer Credits:
Author: Sai Kiran Rayudu
Created on: Decemebr 1st 2023
Organization: Sai Kiran Rayudu Enterprise

********************************************************/

package com.ticketingAppUserTicketsApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ticketingAppUserTicketsApi.Filter.JWTFilter;

@EntityScan
@EnableMongoRepositories
@SpringBootApplication

public class TicketingAppUserTicketsApiApplication {
	
	@Bean
	public FilterRegistrationBean<JWTFilter> jwtFilter() {
		FilterRegistrationBean<JWTFilter> filterBean = new FilterRegistrationBean<JWTFilter>();
		filterBean.setFilter(new JWTFilter());
		filterBean.addUrlPatterns("/api/*");
		return filterBean;
	}

	public static void main(String[] args) {
		SpringApplication.run(TicketingAppUserTicketsApiApplication.class, args);
		System.out.println("ticketingApp User TicketsApi Begins");
	}

}
