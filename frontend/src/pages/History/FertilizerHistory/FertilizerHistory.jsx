import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Container, Box, LinearProgress, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "../../../services/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function FertilizerHistory() {
    const { user } = useAuth();
    const [sampleHistory, setSampleHistory] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4200/store-recommendation-fertilizer/getbyuserID/${user.id}`
                );
                if (response) {
                    setSampleHistory(response.data);
                } else {
                    setSampleHistory([]);
                }
            } catch (error) {
                console.error("Error in fetching crop recommendations by user id in frontend:", error);
                setSampleHistory([]);
            }
        };

        fetchData();
    }, [user.id]);

    return (
        <>
            {sampleHistory.length === 0 ? (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Typography variant="h6" sx={{ color: "#81c784", fontWeight: "bold" }}>
                        Unlock Your Best Harvest Yet! You are almost there
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={70}
                        sx={{ width: "50%", margin: "auto", mt: 2 }}
                    />
                    <Typography variant="body2" sx={{ color: "white", mt: 2 }}>
                        Use our crop recommendation system to boost your farming success!
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#81c784",
                            color: "#323232",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": { bgcolor: "#66a76f" },
                            mt: 2,
                        }}
                        onClick={() => { navigate("/crop-recommendation") }}
                    >
                        Try It Now
                    </Button>
                </Box>
            ) : (
                <Container maxWidth="lg">
                    {sampleHistory.map((entry) => (
                        <motion.div
                            key={entry._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            style={{ marginBottom: "1rem" }}
                        >
                            <Card
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    bgcolor: "rgba(50, 50, 50, 0.25)",
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                                    backdropFilter: "blur(20px)",
                                    border: "1px solid rgba(255, 255, 255, 0.18)",
                                    padding: "1rem",
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ color: "#81c784", fontWeight: "bold" }}>
                                        {entry.Crop}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "white" }}>
                                        <strong>N:</strong> {entry.N} | <strong>P:</strong> {entry.P} | <strong>K:</strong> {entry.K}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "white" }}>
                                        <strong>Moisture:</strong> {entry.soil_moisture} |{" "}
                                        <strong>Temperature:</strong> {entry.temperature} |{" "}
                                        <strong>Humidity:</strong> {entry.humidity}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "white" }}>
                                        <strong>Region:</strong> {entry.Region} | <strong>Soil Type:</strong> {entry.Soil_Type}
                                    </Typography>
                                    <Divider
                                        sx={{
                                            height: "2px",
                                            backgroundColor: "transparent",
                                            backgroundImage: "linear-gradient(90deg, #81c784, #66a76f,rgb(116, 179, 119))",
                                            opacity: 0.8,
                                            my: 1,
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ color: "white" }}>
                                        <strong>Sugestions:</strong> <br />
                                        <strong>Nitrogen :</strong> {entry.Nitrogen}<br />
                                        <strong>Phosphorus :</strong> {entry.Phosphorus}<br />
                                        <strong>Potassium :</strong> {entry.Potassium}<br />
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#b0b0b0", fontStyle: "italic", display: "block", mt: 1 }}>
                                        Updated on: {new Date(entry.createdAt).toLocaleString()}
                                    </Typography>
                                </CardContent>

                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "#81c784",
                                        color: "#323232",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        "&:hover": { bgcolor: "#66a76f" },
                                    }}
                                    onClick={() => navigate("/fertilizer-optimizer", { state: { entry } })}
                                >
                                    Optimize Fertilizer
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </Container>
            )}
        </>
    );
}

export default FertilizerHistory;