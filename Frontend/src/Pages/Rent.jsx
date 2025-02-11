import React, { useState, useEffect } from "react";
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

// Importing images from local assets

import rentImage1 from "../assets/images/c1.jpg";
import rentImage2 from "../assets/images/c2.jpg";
import rentImage3 from "../assets/images/c3.jpg";
import rentImage4 from "../assets/images/c4.jpg";
import rentImage5 from "../assets/images/c5.jpg";
import rentImage6 from "../assets/images/c6.jpg";
import rentImage7 from "../assets/images/c7.jpg";
import rentImage8 from "../assets/images/c8.jpg";
import rentImage9 from "../assets/images/d1.jpg";
import rentImage10 from "../assets/images/d2.jpg";
import rentImage11 from "../assets/images/d3.jpg";
import rentImage12 from "../assets/images/d4.jpg";
import rentImage13 from "../assets/images/d5.jpg";
import rentImage14 from "../assets/images/d6.jpg";
import rentImage15 from "../assets/images/d7.jpg";
import rentImage16 from "../assets/images/d8.jpg";
import rentImage17 from "../assets/images/d9.jpg";


const Rent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [ratings, setRatings] = useState({});
  const [imageIndex, setImageIndex] = useState({}); // Manage the current index of the images for each property

  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Cottage in Bibury",
      rent: "$1500/month",
      images: [rentImage1, rentImage2, rentImage3, rentImage4, rentImage5, rentImage6, rentImage7, rentImage8 ], // Multiple images for this property
      location: "Downtown",
    },
    {
      id: 2,
      title: "Market Drayton",
      rent: "$1200/month",
      images: [rentImage9, rentImage10, rentImage11, rentImage12, rentImage13, rentImage14, rentImage15, rentImage16, rentImage17], // Multiple images for this property
      location: "New York",
    },
  ]);

  // Initialize imageIndex with default values
  useEffect(() => {
    const initialImageIndex = {};
    properties.forEach((property) => {
      initialImageIndex[property.id] = 0; // Set the initial index to 0 for each property
    });
    setImageIndex(initialImageIndex);
  }, [properties]);

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

  // Change to Next Image
  const handleNextImage = (id) => {
    setImageIndex((prev) => {
      const currentIndex = prev[id] || 0;
      const property = properties.find((prop) => prop.id === id);
      const nextIndex = (currentIndex + 1) % property.images.length;
      return { ...prev, [id]: nextIndex };
    });
  };

  // Change to Previous Image
  const handlePrevImage = (id) => {
    setImageIndex((prev) => {
      const currentIndex = prev[id] || 0;
      const property = properties.find((prop) => prop.id === id);
      const prevIndex = (currentIndex - 1 + property.images.length) % property.images.length;
      return { ...prev, [id]: prevIndex };
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
        Rent Properties
      </Typography>
      <Typography variant="h6" paragraph sx={{ color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
        Browse rental listings in your area.
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search by Location or Rent Price"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />

      {/* Filtered rental properties */}
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
                    image={property.images[imageIndex[property.id] || 0]}
                    alt={property.title}
                    onError={() => console.error(`Error loading image for ${property.title}`)} // Image loading error handler
                  />

                  {/* Left Arrow Button */}
                  {property.images.length > 1 && (
                    <IconButton
                      onClick={() => handlePrevImage(property.id)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: 10,
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark background for contrast
                        borderRadius: "50%", // Ensures the button is circular
                        padding: "8px", // Reduced padding for smaller button
                        minWidth: "40px", // Smaller circular button size
                        minHeight: "40px", // Smaller circular button size
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white", // Text color for contrast
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow for better visibility
                      }}
                    >
                      <ChevronLeft sx={{ fontSize: 30 }} />
                    </IconButton>
                  )}

                  {/* Right Arrow Button */}
                  {property.images.length > 1 && (
                    <IconButton
                      onClick={() => handleNextImage(property.id)}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: 10,
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark background for contrast
                        borderRadius: "50%", // Ensures the button is circular
                        padding: "8px", // Reduced padding for smaller button
                        minWidth: "40px", // Smaller circular button size
                        minHeight: "40px", // Smaller circular button size
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white", // Text color for contrast
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow for better visibility
                      }}
                    >
                      <ChevronRight sx={{ fontSize: 30 }} />
                    </IconButton>
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
                  <Typography variant="body2">{property.rent}</Typography>

                  {/* View Details Button */}
                  <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Rent;