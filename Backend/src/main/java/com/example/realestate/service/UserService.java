package com.example.realestate.service;

import com.example.realestate.model.User;
import com.example.realestate.model.Role;
import com.example.realestate.repository.UserRepository;
import com.example.realestate.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists!";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
        userRepository.save(user);

        return "User registered successfully!";
    }

    public String loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return null;
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return null;
        }

        // ✅ Generate JWT token with email & role
        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }

    // ✅ Fix: Implement getUserRole method
    public Role getUserRole(String email) {
        return userRepository.findByEmail(email)
                .map(User::getRole)
                .orElse(Role.BUYER); // Default role if not found
    }

}
