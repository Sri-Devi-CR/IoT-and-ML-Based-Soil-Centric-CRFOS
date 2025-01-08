import React from "react";
import { useNavigate } from "react-router-dom"
import {
  
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  createTheme,
  ThemeProvider,
  Link,
  useMediaQuery,
  CssBaseline,
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
      primary: "#3e2723", // Dark brown
      secondary: "#6d4c41", // Soft brown
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
    h3: {
      fontWeight: 700,
      fontSize: "2.5rem",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h6: {
      fontSize: "1.2rem",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
  },
});


const HomePage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate=useNavigate()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Header */}

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `
      linear-gradient(to right, rgba(10, 17, 11, 0.5) 30%, rgba(129, 199, 132, 1) 100%),
      url('https://png.pngtree.com/thumb_back/fh260/background/20240622/pngtree-rural-scene-green-agricultural-fields-of-moravia-at-daytime-nice-weather-image_15805897.jpg')
    `,
          backgroundSize: "cover", // Ensure the image covers the entire container
          backgroundRepeat: "no-repeat", // Prevent tiling of the image
          backgroundPosition: "center", // Center the background image
          color: "white",
          py: isMobile ? 6 : 10,
          textAlign: "center",
          paddingTop: "17.3%",
        }}
      >
        <Container sx={{}}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              textShadow: "2px 15px 14px rgb(28, 63, 33)",
              fontFamily: "Paris2024",
              fontSize: "370%",
            }}
          >
            Revolutionizing Agriculture
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textShadow: "2px 15px 14px rgb(28, 63, 33)",
              fontFamily: "Paris2024",
              fontSize: "130%",
            }}
          >
            Optimize crop selection and fertilizer usage with IoT and ML.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 3,
              fontFamily: "MyCustomFont",
              fontSize: "90%",
              color: "#323232",
              "&:hover": {
                backgroundColor: "#449c45",
                color: "#222222",
                boxShadow: "1px 3px 15px 5px rgba(40,91,40, 0.7)"
              },
            }}
            onClick={() => navigate("/login")}
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
        <Grid container spacing={4} justifyContent="center">
          {/* Feature 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
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
          </Grid>
          {/* Feature 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
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
          </Grid>
          {/* Feature 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
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
          </Grid>
        </Grid>
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

export default HomePage;