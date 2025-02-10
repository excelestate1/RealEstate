import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";

function App() {
  return (
    <Router> {/* ✅ Wrap everything inside Router */}
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
