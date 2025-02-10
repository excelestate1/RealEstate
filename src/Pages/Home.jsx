import React from "react";
import { Box, Typography, Button, TextField, Select, MenuItem } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        height: "100vh", // Ensure full screen height
        width: "100vw", // Ensure full screen width
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('https://source.unsplash.com/1920x1080/?real-estate')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Centered Heading & Subheading */}
      <Box sx={{ width: "100%", maxWidth: "800px", textAlign: "center", mb: 3 }}>
        <Typography variant="h2" fontWeight="bold" sx={{ textShadow: "2px 2px 10px rgba(0,0,0,0.5)" }}>
          Find Your Dream Property
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, textShadow: "2px 2px 10px rgba(0,0,0,0.5)" }}>
          Buy | Rent | Sell Properties with Ease
        </Typography>
      </Box>

      {/* Centered Search Bar */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "90%",
          maxWidth: "900px",
          bgcolor: "rgba(255, 255, 255, 0.2)", // Slight transparency
          p: 3,
          borderRadius: "10px",
          backdropFilter: "blur(8px)",
        }}
      >
        <TextField
          label="Location"
          variant="outlined"
          sx={{ bgcolor: "white", width: "30%", borderRadius: "5px" }}
        />
        <Select defaultValue="" sx={{ bgcolor: "white", width: "30%", borderRadius: "5px" }}>
          <MenuItem value="">Property Type</MenuItem>
          <MenuItem value="house">House</MenuItem>
          <MenuItem value="apartment">Apartment</MenuItem>
          <MenuItem value="villa">Villa</MenuItem>
        </Select>
        <Select defaultValue="" sx={{ bgcolor: "white", width: "30%", borderRadius: "5px" }}>
          <MenuItem value="">Price Range</MenuItem>
          <MenuItem value="0-50K">₹0 - ₹50K</MenuItem>
          <MenuItem value="50K-1L">₹50K - ₹1L</MenuItem>
          <MenuItem value="1L-5L">₹1L - ₹5L</MenuItem>
        </Select>
        <Button variant="contained" color="primary" sx={{ width: "15%", fontSize: "16px", fontWeight: "bold" }}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
