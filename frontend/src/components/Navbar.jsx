import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate()
  return (

    <AppBar position="static" sx={{
      background: "#4caf50"


    }}>
      <Toolbar sx={{  }}>
        <Typography variant="h6" sx={{
          flexGrow: 1,
          cursor:"pointer"
          }}
          onClick={()=> navigate("/")}
          >
          IoT & ML-Based CRFOS
        </Typography>

        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Log in
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        <Button color="inherit" component={Link} to="/About">
          About us
        </Button>

      </Toolbar>
    </AppBar>
    // <Box sx={{
    //   backgroundColor:"Pink",
    //   width: "100vw",
    //   height:"8.5vh",
    //   position:"relative"
    // }}>

    // {/*logo */}
    //   <Box sx={{
    //     backgroundColor:"transparent",
    //     width:"14vw",
    //     position:"absolute",
    //     left:'7%',
    //     top:"10%"
    //   }}>
    //   IoT & ML-Based CRFOS

    //   </Box>
    // </Box>
  );
};

export default Navbar;
