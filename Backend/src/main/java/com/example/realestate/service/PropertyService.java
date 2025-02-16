package com.example.realestate.service;

import com.example.realestate.model.Property;
import com.example.realestate.model.User;
import com.example.realestate.repository.PropertyRepository;
import com.example.realestate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    public Property addProperty(Long sellerId, Property property) {
        Optional<User> seller = userRepository.findById(sellerId);

        if (seller.isPresent() && "SELLER".equals(seller.get().getRole())) {
            property.setSeller(seller.get());
            return propertyRepository.save(property);
        } else {
            throw new RuntimeException("User is not a seller");
        }
    }

    public List<Property> getPropertiesBySeller(Long sellerId) {
        return propertyRepository.findBySellerId(sellerId);
    }
}
