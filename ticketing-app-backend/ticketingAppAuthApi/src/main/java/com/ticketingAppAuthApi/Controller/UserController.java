package com.ticketingAppAuthApi.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketingAppAuthApi.Model.User;
import com.ticketingAppAuthApi.Repository.UserRepository;
import com.ticketingAppAuthApi.Service.AuthService;
import com.ticketingAppAuthApi.Service.UserService;
import com.ticketingAppAuthApi.exceptions.UserAlreadyExistsException;

@CrossOrigin
@RestController
@RequestMapping("/auth/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
    private UserRepository userRepository;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user){
		User registeredUser;
		Map<String,String> response = new HashMap<>();
		try {
			registeredUser = userService.addUser(user);
		} catch (UserAlreadyExistsException e) {
			response.put("message", "User Already Exists");
			return new ResponseEntity<>(response,HttpStatus.CONFLICT);
		}
		if(registeredUser!=null) {
			response.put("message", "User Registered Successfully");
			return new ResponseEntity<>(response,HttpStatus.CREATED);
		}
		response.put("message", "Cannot Register User - Internal Server Error");
		return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
	    Map<String, Object> map = new HashMap<>();
	    try {
	        String jwtToken = authService.generateToken(user.getEmail(), user.getPassword());

	        // Retrieve user details including ID and role from the database
	        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());

	        if (userOptional.isPresent()) {
	            User userDetails = userOptional.get();

	            map.put("message", "User Successfully LoggedIn");
	            map.put("token", jwtToken);
	            map.put("role", userDetails.getRole()); // Include user role in the response
	            return new ResponseEntity<>(map, HttpStatus.OK);
	        } else {
	            throw new Exception("User not found in the database");
	        }
	    } catch (Exception e) {
	        map.put("message", e.getMessage());
	        map.put("token", null);
	        return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
	    }
	}



}
