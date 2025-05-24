import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/authContext";
import { Container, Paper, Typography, Box, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [recommendedCrop, setRecommendedCrop] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const requestBody = location.state;

  const fetchRecommendation = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/recommend-crop", requestBody);
      setRecommendedCrop(response.data.Recommended_Crop);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching crop recommendation:", err);
      setError("Failed to fetch crop recommendation. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendation();
  }, []);

  useEffect(() => {
    if (recommendedCrop) {
      const storeRequestBody = {
        ...requestBody,
        userId: user?.id || null,
        Crop: recommendedCrop,
      };
      axios.post("http://localhost:4200/store-recommendation-crop", storeRequestBody)
        .then(response => console.log("Crop recommendation stored:", response))
        .catch(error => console.log("Error saving crop recommendation:", error));
    }
  }, [recommendedCrop]);

  const HandleClick = () => {
    if(user){
      navigate("/Dashboard")
    }
    else{
      navigate("/ua/home")
    }
  }

  return (
    <Container
      maxWidth="xl"
      disableGutters
      className="background-container5"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        background: "linear-gradient(135deg, #0f2027, #203a43, #254756)",
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
          sx={{ mb: 4, color: "#4caf50", textShadow: "0 0 12px rgba(73, 168, 121, 0.8)" }}
        >
          Crop<br /> Recommendation
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
                  Based on the given soil type and nutrient levels, the most suitable crop is:
                </Typography>
                <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                  {recommendedCrop}
                </Typography>
                <Typography sx={{ mt: 2, fontSize: "1rem", color: "#ddd" }}>
                Ensure proper irrigation and care for optimal yield. For even better results, 
                use our Fertilizer Optimizer to determine the perfect nutrient balance and maximize your yield.
                </Typography>
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
}

export default ResultPage;
