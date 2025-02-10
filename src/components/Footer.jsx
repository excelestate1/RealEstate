import React from "react";
import { Box, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        bgcolor: "#f5f5f5",
        textAlign: "center",
        py: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body2">© 2025 RealEstate. All rights reserved.</Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
        <Facebook sx={{ cursor: "pointer" }} />
        <Instagram sx={{ cursor: "pointer" }} />
        <Twitter sx={{ cursor: "pointer" }} />
      </Box>
    </Box>
  );
};

export default Footer;
