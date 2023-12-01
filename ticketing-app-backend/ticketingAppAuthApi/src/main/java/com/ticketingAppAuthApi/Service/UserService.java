package com.ticketingAppAuthApi.Service;

import com.ticketingAppAuthApi.Model.User;
import com.ticketingAppAuthApi.exceptions.UserAlreadyExistsException;

public interface UserService 
{
	public User addUser(User user) throws UserAlreadyExistsException;
	public boolean validateUser(String email,String password);

}
