import axios from "axios";

// Base URL for backend API
const API_URL = "http://localhost:8080/api/user";

// User Registration API
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      return { error: error.response?.data?.message || "Error connecting to server" };
    }
  };
// User Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    console.log("Login Successful:", response.data);
    return response.data; // Return user data and token if available
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Login failed" }; // Return proper error message
  }
};
