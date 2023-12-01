package com.ticketingAppUserTicketsApi.Filter;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
  
public class JWTFilter extends GenericFilterBean{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String authHeader = httpRequest.getHeader("Authorization");
		
		httpResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		 httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
		 httpResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		 httpResponse.setHeader("Access-Control-Max-Age", "3600");
		 httpResponse.setHeader("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization, remember-me");
		 
		 if("OPTIONS".equals(httpRequest.getMethod())) {
				httpResponse.setStatus(HttpServletResponse.SC_OK);
				chain.doFilter(httpRequest, httpResponse);
			}else {
				if(authHeader==null||!authHeader.startsWith("Bearer")) {
					throw new ServletException("Missing or invalid Authorization header");
				}
		String jwtToken = authHeader.substring(7);
		Claims claims = Jwts.parser().setSigningKey("TicketingAppSecretKey").parseClaimsJws(jwtToken).getBody();
		httpRequest.setAttribute("user", claims);
		httpResponse.setStatus(200);
		chain.doFilter(httpRequest,httpResponse);
			}
	}
}
