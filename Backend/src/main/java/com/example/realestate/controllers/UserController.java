package com.example.realestate.controllers;

import com.example.realestate.model.User;
import com.example.realestate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Register User
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        if (user.getName() == null || user.getEmail() == null || user.getPassword() == null || user.getRole() == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "All fields are required!"
            ));
        }

        // Check if user already exists
        boolean userExists = userService.isUserExists(user.getEmail());

        if (userExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                "success", false,
                "message", "User already exists!"
            ));
        }

        // Register new user
        String response = userService.registerUser(user);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", response
        ));
    }



    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Handle missing fields
        if (email == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Email and password are required"));
        }

        // Authenticate user
        boolean isAuthenticated = userService.loginUser(email, password);

        if (!isAuthenticated) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid credentials"));
        }

        return ResponseEntity.ok(Map.of("message", "Login successful"));
    }

}
