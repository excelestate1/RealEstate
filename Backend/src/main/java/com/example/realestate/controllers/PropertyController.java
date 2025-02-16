package com.example.realestate.controllers;

import com.example.realestate.model.Property;
import com.example.realestate.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/property")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping("/add/{sellerId}")
    public ResponseEntity<Property> addProperty(@PathVariable Long sellerId, @RequestBody Property property) {
        Property savedProperty = propertyService.addProperty(sellerId, property);
        return ResponseEntity.ok(savedProperty);
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Property>> getSellerProperties(@PathVariable Long sellerId) {
        List<Property> properties = propertyService.getPropertiesBySeller(sellerId);
        return ResponseEntity.ok(properties);
    }
}
