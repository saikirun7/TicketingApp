package com.ticketingAppAuthApi.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ticketingAppAuthApi.Model.User;

public interface UserRepository extends JpaRepository<User, Integer> 
{
    public Optional<User> findByEmail(String email);
	
	@Query(value="select u from User u where u.email= :email and u.password= :password")
	public Optional<User> validateUser(String email, String password);
	
	@Query(value = "SELECT u.role FROM User u WHERE u.email = :email")
    Optional<String> findRoleByEmail(String email);
}
