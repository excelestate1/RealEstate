import { useState } from "react";
import { Box, TextField, Button, Grid, Typography, Snackbar, Alert } from "@mui/material";

const Sell = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!title || !description || !price || !location || !image) {
      setSnackbarMessage("Please fill out all fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const newListing = { title, description, price, location, image };

    try {
      // Send a POST request to the mock API
      const response = await fetch("http://localhost:3000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newListing),
      });

      if (!response.ok) {
        throw new Error("Failed to list property.");
      }

      // Clear the form
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setImage("");

      // Show success message
      setSnackbarMessage("Property listed successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error listing property:", error);
      setSnackbarMessage("Failed to list property. Please try again.");
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
      <Typography variant="h6" paragraph>
        List your property for sale and reach potential buyers.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Property Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <TextField
          label="Image URL"
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
          List Property
        </Button>
      </form>

      {/* Snackbar for success/error messages */}
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