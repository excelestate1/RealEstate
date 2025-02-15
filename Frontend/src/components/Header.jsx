import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import excelLogo from "../assets/excel_logo.png"; // Updated logo with reduced spacing

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: "#123456", width: "100%", zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: "space-between", maxWidth: "1200px", mx: "auto", width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
            <img src={excelLogo} alt="XcelEstate Logo" style={{ height: "60px", marginRight: "5px" }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
              XcelEstate
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/buy">Buy</Button>
          <Button color="inherit" component={Link} to="/rent">Rent</Button>
          <Button color="inherit" component={Link} to="/sell">Sell</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Button color="inherit" variant="contained" component={Link} to="/login">
            Login / Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
