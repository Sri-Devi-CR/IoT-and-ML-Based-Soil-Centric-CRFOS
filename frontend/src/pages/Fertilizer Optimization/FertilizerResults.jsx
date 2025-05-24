import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Paper, Typography, Box, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/authContext";

const FertilizerResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestBody, receivedData } = location.state;
  const { user } = useAuth();
  const [fertilizerData, setFertilizerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchFertilizerRecommendation = async () => {
    try {
      console.log("receivedData:", receivedData)
      console.log("request body:", requestBody)
      const response = await axios.post("http://127.0.0.1:5000/optimize-fertilizer", requestBody);
      setFertilizerData(response.data);

      const storeRequestBody = {
        ...requestBody,
        Crop: requestBody.Crop,
        Nitrogen: response.data.Nitrogen,
        Phosphorus: response.data.Phosphorus,
        Potassium: response.data.Potassium,
      };
      if(user){
        storeRequestBody.userId = user.id
      }
      console.log("Final body for storing:", storeRequestBody);
      await axios.post(`http://localhost:4200/store-recommendation-fertilizer`, storeRequestBody);
    } catch (err) {
      console.error("Error fetching or storing fertilizer recommendation:", err);
      setError("Failed to fetch or store fertilizer recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFertilizerRecommendation();
  }, []);

  const HandleClick = () => {
    if (user) {
      navigate("/Dashboard")
    }
    else {
      navigate("/ua/home")
    }
  }
  return (
    <Container
      maxWidth="xl"
      disableGutters
      className="background-container6"
      sx={{
        height: "100vh",
        py: 6,
        px: { xs: 2, sm: 4 },
        background: "linear-gradient(135deg, #0f2027, #203a43, #254756)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight={700}
          sx={{
            mb: 4,
            color: "#4caf50",
            textShadow: "0 0 12px rgba(73, 168, 121, 0.8)",
          }}
        >
          Fertilizer <br />
          Recommendation
        </Typography>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box display="flex" justifyContent="center">
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, md: 5 },
              maxWidth: "500px",
              borderRadius: "20px",
              background: "rgba(230, 230, 230, 0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid #00e67644",
              boxShadow: "0 10px 30px rgba(58, 131, 94, 0.2)",
              color: "#fff",
              textAlign: "center",
            }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "#4caf50" }} />
            ) : error ? (
              <Typography sx={{ color: "red", fontSize: "1.2rem" }}>{error}</Typography>
            ) : (
              <>
                <Typography variant="h6" gutterBottom>
                  Based on the crop and soil nutrient levels, adjust the fertilizer levels as follows:
                </Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>Nitrogen: {fertilizerData?.Nitrogen}</li>
                  <li>Phosphorus: {fertilizerData?.Phosphorus}</li>
                  <li>Potassium: {fertilizerData?.Potassium}</li>
                </ul>
              </>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: "#4caf50",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#388e3c" },
                }}
                onClick={HandleClick}
              >
                Go to Dashboard
              </Button>
            </motion.div>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default FertilizerResults;
