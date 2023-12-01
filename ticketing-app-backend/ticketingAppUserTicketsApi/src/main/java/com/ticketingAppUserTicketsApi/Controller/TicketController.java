package com.ticketingAppUserTicketsApi.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketingAppUserTicketsApi.Model.Ticket;
import com.ticketingAppUserTicketsApi.Service.UserTicketService;

import io.jsonwebtoken.Claims;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class TicketController {

    @Autowired
    private UserTicketService userTicketService;

    @PostMapping("/ticketsdata")
    public ResponseEntity<Map<String, String>> addTicketOfUser(@RequestAttribute("user") Claims email, @RequestBody Ticket ticket) {
        boolean added = userTicketService.addTicketOfUser(email.getSubject(), ticket);
        Map<String, String> response = new HashMap<>();

        if (added) {
            response.put("message", "Ticket Added");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }

        response.put("message", "Cannot Add Ticket");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/ticketsdata")
    public ResponseEntity<Map<String, Object>> getAllTicketsOfUser(@RequestAttribute("user") Claims email) {
        List<Ticket> allTickets = userTicketService.getAllTicketsOfUser(email.getSubject());
        Map<String, Object> response = new HashMap<>();

        if (allTickets.size() == 0) {
            response.put("message", "No Bookmarked Tickets to display");
        } else {
            response.put("tickets", allTickets);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

