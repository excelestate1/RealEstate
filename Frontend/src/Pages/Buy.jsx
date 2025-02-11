import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
} from "@mui/material";
import { Favorite, FavoriteBorder, ChevronLeft, ChevronRight } from "@mui/icons-material";

// Importing images
import villaImage from "../assets/images/villa.jpg";
import apartmentImage from "../assets/images/apartment.jpg";
import newPropertyImage from "../assets/images/new_property.jpg";
import villaImage2 from "../assets/images/villa_grandeur.jpg";
import apartmentImage2 from "../assets/images/apartment_st.jpg";
import villaImage3 from "../assets/images/sun_view.jpg";
import apartmentImage3 from "../assets/images/apartment_view.jpg";
import newPropertyImage2 from "../assets/images/new_property_garden.jpg";


const Buy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [ratings, setRatings] = useState({});
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Villa in Miami",
      price: "$1M/Month",
      images: [villaImage, villaImage2, villaImage3],
      location: "Miami",
    },
    {
      id: 2,
      title: "Apartment in NYC",
      price: "$800K/Month",
      images: [apartmentImage, apartmentImage2, apartmentImage3],
      location: "New York City",
    },
    {
      id: 3,
      title: "New Property in LA",
      price: "$1.5M/Month",
      images: [newPropertyImage, newPropertyImage2],
      location: "Los Angeles",
    },
  ]);

  // Initialize image index for each property
  const [imageIndex, setImageIndex] = useState(
    properties.reduce((acc, property) => {
      acc[property.id] = 0;
      return acc;
    }, {})
  );

  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  // Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      newWishlist.has(id) ? newWishlist.delete(id) : newWishlist.add(id);
      return newWishlist;
    });
  };

  // Handle Rating Change
  const handleRatingChange = (id, newValue) => {
    setRatings((prev) => ({ ...prev, [id]: newValue }));
  };

  // Circular navigation logic for images
  const handleNextImage = (id) => {
    setImageIndex((prev) => {
      const currentIndex = prev[id];
      const property = properties.find((prop) => prop.id === id);
      const nextIndex = (currentIndex + 1) % property.images.length;
      return { ...prev, [id]: nextIndex };
    });
  };

  const handlePrevImage = (id) => {
    setImageIndex((prev) => {
      const currentIndex = prev[id];
      const property = properties.find((prop) => prop.id === id);
      const prevIndex = (currentIndex - 1 + property.images.length) % property.images.length;
      return { ...prev, [id]: prevIndex };
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        padding: 2,
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline // Ensures video plays inline on mobile devices
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1, // Ensure the video stays in the background
        }}
      >
      </Box>

      {/* Content Overlay */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
          Buy Properties
        </Typography>
        <Typography variant="h6" paragraph sx={{ color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
          Find your dream property to buy.
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search by Location or Price"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "4px" }}
        />

        {/* Properties Grid */}
        <Grid container spacing={2}>
          {properties
            .filter(
              (property) =>
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.location.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card>
                  <Box position="relative">
                    {/* Main Property Image */}
                    <CardMedia
                      component="img"
                      height="200"
                      image={property.images[imageIndex[property.id]]}
                      alt={property.title}
                    />

                    {/* Image Navigation Buttons */}
                    {property.images.length > 1 && (
                      <>
                        <IconButton
                          onClick={() => handlePrevImage(property.id)}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: 10,
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            borderRadius: "50%",
                            padding: "8px",
                            minWidth: "40px",
                            minHeight: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <ChevronLeft sx={{ fontSize: 30 }} />
                        </IconButton>

                        <IconButton
                          onClick={() => handleNextImage(property.id)}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            right: 10,
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            borderRadius: "50%",
                            padding: "8px",
                            minWidth: "40px",
                            minHeight: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <ChevronRight sx={{ fontSize: 30 }} />
                        </IconButton>
                      </>
                    )}

                    {/* Wishlist Button */}
                    <IconButton
                      onClick={() => toggleWishlist(property.id)}
                      sx={{ position: "absolute", top: 10, right: 10, color: "red" }}
                    >
                      {wishlist.has(property.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>

                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6">{property.title}</Typography>

                      {/* Rating System */}
                      <Rating
                        value={ratings[property.id] || 0}
                        onChange={(event, newValue) => handleRatingChange(property.id, newValue)}
                      />
                    </Box>

                    <Typography variant="body1">{property.location}</Typography>
                    <Typography variant="body2">{property.price}</Typography>

                    {/* View Details Button */}
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                      View Details
                    </Button>

                    {/* Buy Button */}
                    <Button variant="contained" color="secondary" sx={{ marginTop: 2, marginLeft: 2 }}>
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Buy;