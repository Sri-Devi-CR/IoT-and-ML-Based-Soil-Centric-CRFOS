import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          IoT & ML-Based CRFOS
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/crop-recommendation">
          Crop Recommendation
        </Button>
        <Button color="inherit" component={Link} to="/results">
          Results
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
