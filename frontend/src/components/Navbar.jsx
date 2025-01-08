import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate()
  return (
    <AppBar
      position="fixed"
      elevation={0} // Remove shadow
      sx={{
        background: "rgba(150, 255, 150, 0.3)", // Transparent white
        backdropFilter: "blur(10px)", // Frosted glass effect
        boxShadow: "3px 4px 30px rgba(0, 0, 0, 0.2)", // Optional soft shadow
        // borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Optional border
        zIndex: 1301, // Ensures it overlaps the content
      }}
    >
      <Toolbar
        sx={{
          color: "#323232",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "Paris2024",
            cursor: "pointer",
            "&:hover": {
              color: "black",
              backgroundColor: "transparent", // Prevent background color change on hover
            },
          }}
          onClick={() => navigate("/")}
        >
          IoT & ML-Based CRFOS
        </Typography>
        <Button
          component={Link}
          to="/home"
          disableRipple
          sx={{
            fontFamily: "Paris2024",
            color: "#333", // Customize button text color
            textDecoration: "none", // Remove underline
            fontWeight: "bold",
            "&:hover": {
              color: "black",
              backgroundColor: "transparent", // Prevent background color change on hover
            },
          }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/login"
          disableRipple
          sx={{
            color: "#333",
            fontFamily: "Paris2024",
            textDecoration: "none",
            fontWeight: "bold",
            "&:hover": {
              color: "black",
              backgroundColor: "transparent",
            },
          }}
        >
          Log in
        </Button>
        <Button
          component={Link}
          to="/register"
          disableRipple
          sx={{
            color: "#333",
            fontFamily: "Paris2024",
            textDecoration: "none",
            fontWeight: "bold",
            "&:hover": {
              color: "black",
              backgroundColor: "transparent",
            },
          }}
        >
          Register
        </Button>
        <Button
          component={Link}
          to="/about"
          disableRipple
          sx={{
            color: "#333",
            textDecoration: "none",
            fontFamily: "Paris2024",
            fontWeight: "bold",
            "&:hover": {
              color: "black",
              backgroundColor: "transparent",
            },
          }}
        >
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