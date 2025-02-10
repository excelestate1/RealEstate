import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  useEffect(() => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!formData.role) {
      errors.role = "Please select a role.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Select Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="agent">Agent</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* Register Button */}
        <button
          className={`w-full py-2 text-white font-bold rounded ${
            isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Register
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
