import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid2,
  Box,
  Card,
  CardContent,
  CardMedia,
  createTheme,
  ThemeProvider,
  Link,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Earthy green
    },
    secondary: {
      main: "#ffb74d", // Warm yellow
    },
    background: {
      default: "#f1f8e9", // Light greenish background
    },
    text: {
      primary: "#3e2723", // Dark brown for text
      secondary: "#6d4c41", // Soft brown for secondary text
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
    h3: {
      fontWeight: 700,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            IoT & ML-Based CRFOS
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #4caf50, #81c784)",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom>
            Revolutionizing Agriculture
          </Typography>
          <Typography variant="h6" gutterBottom>
            Optimize crop selection and fertilizer usage with IoT and ML.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 3 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ my: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Features
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
        >
          Explore the key benefits of our intelligent agricultural system.
        </Typography>
        <Grid2 container spacing={4}>
          {/* Feature 1 */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="160"
                image="https://sustainable-earth.org/wp-content/uploads/AOE-Blog-Organic-Soil-e1678985025262.jpeg"
                alt="Soil Analysis"
              />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Soil Analysis
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Get detailed insights into soil health for informed decisions.
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          {/* Feature 2 */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="160"
                image="https://storage.googleapis.com/kaggle-datasets-images/4933767/8305330/16928419f10aea52c9156b0cc4dc86ee/dataset-cover.jpg?t=2024-05-03-21-04-19"
                alt="Crop Recommendations"
              />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Crop Recommendations
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Leverage ML to select the most suitable crops for your land.
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          {/* Feature 3 */}
          <Grid2 item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="160"
                image="https://eos.com/wp-content/uploads/2023/11/components-of-different-types-of-fertilizers.jpg.webp"
                alt="Fertilizer Optimization"
              />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Fertilizer Optimization
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Minimize costs and environmental impact with precise
                  fertilizer use.
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 4,
          mt: 6,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            &copy; 2024 IoT and ML-Based Soil-Centric CRFOS. All rights
            reserved.
          </Typography>
          <Link href="#" color="inherit" sx={{ mr: 2 }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" sx={{ mr: 2 }}>
            Terms of Service
          </Link>
          <Link href="#" color="inherit">
            Contact Us
          </Link>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
