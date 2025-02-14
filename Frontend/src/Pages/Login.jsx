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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData.email, formData.password);

      if (response.error) {
        setError(response.error);
      } else {
        localStorage.setItem("token", response.token); // Store token
        localStorage.setItem("role", response.role); // Store role

        if (response.role === "ADMIN") {
          navigate("/admin");
        } else if (response.role === "BUYER") {
          navigate("/buy");
        } else if (response.role === "SELLER" || response.role === "AGENT") {
          navigate("/sell");
        }
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
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} margin="normal" />
          <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} margin="normal" />
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
