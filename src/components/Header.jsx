import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "blue", width: "100%" }}>
      <Toolbar sx={{ justifyContent: "space-between", maxWidth: "1200px", mx: "auto", width: "100%" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          RealEstate
        </Typography>

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
