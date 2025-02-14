package com.example.realestate.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtFilter implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        System.out.println("🔍 Authorization Header: " + authHeader); // Debugging

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("❌ Missing or Invalid Token!");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("Missing or invalid token");
            return false;
        }

        String token = authHeader.substring(7);
        System.out.println("🔑 Extracted Token: " + token); // Debugging

        try {
            if (!jwtUtil.validateToken(token)) {
                System.out.println("❌ Invalid Token!");
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("Invalid token");
                return false;
            }

            Claims claims = jwtUtil.extractClaims(token);
            request.setAttribute("email", claims.getSubject());
            request.setAttribute("role", claims.get("role", String.class));

            System.out.println("✅ User Email: " + claims.getSubject());
            System.out.println("✅ User Role: " + claims.get("role"));

            return true;

        } catch (JwtException e) {
            System.out.println("❌ Token validation failed: " + e.getMessage());
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("Token validation failed: " + e.getMessage());
            return false;
        }
    }
}
