import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { loginUser } from "../Services/User";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirecting after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent API call if validation fails

    try {
      const response = await loginUser(formData.email, formData.password);
      
      if (response.error) {
        setError(response.error); // Display backend error
      } else {
        console.log("Login successful!", response);
        localStorage.setItem("token", response.token); // Store token if needed
        navigate("/dashboard"); // Redirect to dashboard after login
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
          />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
            Login
          </Button>
        </form>
        {error && <Typography color="error" align="center" sx={{ mt: 2 }}>{error}</Typography>}
        <Typography align="center" sx={{ mt: 2 }}>
          <Link to="/register">Don't have an account? Register</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
