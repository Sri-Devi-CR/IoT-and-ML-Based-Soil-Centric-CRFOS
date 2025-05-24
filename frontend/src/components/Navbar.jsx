import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../services/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(20, 20, 20, 0.3)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.2)",
        zIndex: 1301,
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h6"
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          sx={{ fontFamily: "Paris2024", fontWeight: "bold", cursor: "pointer", color: "white" }}
          onClick={() => navigate("/")}
        >
          IoT & ML-Based CRFOS
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMenuOpen}
                sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              >
                <Avatar
                  src={user.profilePic || "/default-avatar.png"}
                  sx={{ width: 40, height: 40, mr: 1 }}
                />
                <Typography variant="body1" sx={{ color: "white", fontWeight: "bold", "&:hover": { color: "#81c784" }  }}>
                  Welcome, {user.username}
                </Typography>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ mt: 1 }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/dashboard");
                  }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#81c784" }  
                }}
              >
                Log in
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#81c784" }
                }}
              >
                Register
              </Button>
            </>
          )}
          <Button
            component={Link}
            to="/about"
            sx={{
              color: "white",
              fontWeight: "bold",
              transition: "color 0.3s ease",
              "&:hover": { color: "#81c784" }
            }}
          >
            About us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
