import { useState } from "react";
import { Box, TextField, Button, Grid, Typography, Snackbar, Alert, MenuItem } from "@mui/material";

const Sell = () => {
  const [propertyName, setPropertyName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve seller ID and token from local storage
    const id = localStorage.getItem("id");
    const rawToken = localStorage.getItem("token");

    if (!id || !rawToken) {
      setSnackbarMessage("User authentication failed. Please log in again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const token = `Bearer ${rawToken}`; // Ensure correct token format

    // Basic validation
    if (!propertyName || !description || !price || !location || !image || !type) {
      setSnackbarMessage("Please fill out all fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const newListing = { propertyName, description, price, location, image, type };

    console.log("Sending request to:", `http://localhost:9090/property/add/${id}`);
    console.log("Authorization Header:", token);
    console.log("Request Payload:", newListing);

    try {
      const response = await fetch(`http://localhost:9090/property/add/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Ensure Bearer token is correct
        },
        body: JSON.stringify(newListing),
      });

      const result = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Data:", result);

      if (response.status === 403) {
        throw new Error("Access Denied: Invalid token or insufficient permissions.");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to list property.");
      }

      // Clear the form
      setPropertyName("");
      setDescription("");
      setPrice("");
      setLocation("");
      setImage("");
      setType("");

      setSnackbarMessage("Property listed successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error listing property:", error);
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Sell Your Property
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Property Name"
          variant="outlined"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        {/* Image Upload & URL Input */}
        <TextField
          label="Image URL (or Upload Below)"
          variant="outlined"
          value={image.startsWith("data:image/") ? "" : image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" component="label" sx={{ mt: 1 }}>
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>

        {image && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img src={image} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: 200, marginTop: 10 }} />
          </Box>
        )}

        <TextField
          select
          label="Type"
          variant="outlined"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="BUY">BUY</MenuItem>
          <MenuItem value="RENT">RENT</MenuItem>
        </TextField>

        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
          List Property
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Sell;
