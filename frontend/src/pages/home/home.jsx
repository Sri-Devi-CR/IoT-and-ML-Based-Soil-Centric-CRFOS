import React from "react";
import { Container, Typography, Box, Card, CardContent, CardMedia, CssBaseline, ThemeProvider, Button, createTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate=useNavigate()
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        },
    };

    const theme = createTheme({
        palette: {
            primary: { main: "#4caf50" },
            secondary: { main: "#ffb74d" },
            background: { default: "#f1f8e9" },
            text: {
                primary: "#3e2723",
                secondary: "#6d4c41",
            },
        },
        typography: {
            fontFamily: "Paris2024 , Arial",
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    backgroundImage: "linear-gradient(to left, rgba(10, 17, 11, 0.7) 10%, rgba(129, 199, 132, 0.2) 100%), url('https://media.istockphoto.com/id/1154958041/photo/taking-care-of-the-crop-aerial-view-of-a-tractor-fertilizing-a-cultivated-agricultural-field.jpg?s=612x612&w=0&k=20&c=McnQdUpl6P0Bomx4o8ZG2oHqwIVBC2s5CwWQm58dWRI=')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                    py: 8,

                    
                    display: "flex",
                    alignItems: "center",
                    overflow:"hidden",
                }}
            >
                <Container sx={{
                    marginTop:"25px",
                    overflow:"hidden",
                    
                }}>
                    <Typography
                        variant="h3"
                        align="center"
                        gutterBottom
                        sx={{
                            color: "#ffffff",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                            mb: 4,
                        }}
                    >
                        Welcome to CRFOS
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color="#e0e0e0"
                        paragraph
                    >
                        Explore the tools that revolutionize farming by making data-driven decisions easy.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 4,
                            mt: 6,
                            justifyContent: "center",
                            
                            marginBottom:"25px"
                        }}
                    >
                        {/* Crop Recommendations Card */}
                        <motion.div
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                        >
                            <Card
                                sx={{
                                    maxWidth: 600,
                                    mx: "auto",
                                    backdropFilter: "blur(10px)",
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.5)",
                                    borderRadius: 3,
                                    border: "1px solid rgba(255, 255, 255, 0.3)",
                                    overflow: "hidden",
                                    transition: "transform 0.3s",
                                    cursor:"pointer"
                                }}
                                onClick={()=>navigate("/crop-recommendation")}
                            >
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image="https://www.shutterstock.com/image-photo/young-corn-plants-growing-on-600nw-2299683499.jpg"
                                    alt="Crop Recommendations"
                                />
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{
                                            color: "#e0e0e0",
                                            mb: 2,
                                            
                                        }}
                                    >
                                        Crop Recommendations
                                    </Typography>
                                    <Typography variant="body1" color="#e0e0e0">
                                        Harness the power of Machine Learning to select the most suitable crops for your soil, maximizing yield and sustainability.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 3 }}
                                        onClick={()=>navigate("/crop-recommendation")}
                                    >
                                        Try Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Fertilizer Optimizer Card */}
                        <motion.div
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                        >
                            <Card
                                sx={{
                                    maxWidth: 600,
                                    mx: "auto",
                                    backdropFilter: "blur(10px)",
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.5)",
                                    borderRadius: 3,
                                    border: "1px solid rgba(255, 255, 255, 0.3)",
                                    overflow: "hidden",
                                    transition: "transform 0.3s",
                                    cursor:"pointer"
                                }}
                                onClick={()=>navigate("/fertilizer-optimization")}
                            >
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image="https://media.istockphoto.com/id/606230424/photo/agriculture.jpg?s=612x612&w=0&k=20&c=byKybbMGCEAgdgfgyvUXC2ttl_8nbfc7JKpKFYg6rw4="
                                    alt="Fertilizer Optimizer"
                                />
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{
                                            color: "#e0e0e0",
                                            mb: 2,
                                        }}
                                    >
                                        Fertilizer Optimizer
                                    </Typography>
                                    <Typography variant="body1" color="#e0e0e0">
                                        Reduce costs and environmental impact by using precise fertilizer application techniques tailored to your soil's needs.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 3 }}
                                        onClick={()=>navigate("/fertilizer-optimizer")}
                                    >
                                        Try Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Home;
