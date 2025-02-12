package com.example.realestate.service;

import com.example.realestate.model.User;
import com.example.realestate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    //@Autowired
    //private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists!";
        }

        //user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password before saving
        userRepository.save(user);
        
        return "User registered successfully!";
    }
    public boolean isUserExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();

        // Check password
        if (!password.equals(user.getPassword())) {
            return false;
        }

        return true;
    }


}