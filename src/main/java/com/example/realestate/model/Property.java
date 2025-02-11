package com.example.realestate.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private double price;
    private String location;
    private String description;
    private String type; // House, Apartment, Villa

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
}