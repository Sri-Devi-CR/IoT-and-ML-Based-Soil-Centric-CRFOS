import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Box, CssBaseline } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputFields from "./components/NPKFields";
import CustomDropdown from "./components/CustomDropdown";
import RecommendationButton from "./components/RecommendationButton";
import "./cropRecommendation.css";

function CropRecommendationPage() {
  const navigate = useNavigate();
  const [randomValues, setRandomValues] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    temperature: 0,
    moisture: 0,
    humidity: 0,
  });

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [soilTypes, setSoilTypes] = useState([]);
  const [selectedSoilType, setSelectedSoilType] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setRandomValues({
      nitrogen: Math.floor(Math.random() * 100),
      phosphorus: Math.floor(Math.random() * 100),
      potassium: Math.floor(Math.random() * 100),
      temperature: 0,
      moisture: 0,
      humidity: Math.floor(Math.random() * 100),
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4200/soil-data/regions")
      .then((res) => setRegions(res.data))
      .catch((err) => console.error("Error fetching regions:", err));
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      axios.get(`http://localhost:4200/soil-data/soil-types/${selectedRegion}`)
        .then((res) => setSoilTypes(res.data))
        .catch((err) => console.error("Error fetching soil types:", err));
    } else {
      setSoilTypes([]);
    }
  }, [selectedRegion]);

  const handleGetRecommendations = () => {
    const newErrors = {};

    if (!randomValues.nitrogen) newErrors.nitrogen = "Nitrogen is required!";
    if (!randomValues.phosphorus) newErrors.phosphorus = "Phosphorus is required!";
    if (!randomValues.potassium) newErrors.potassium = "Potassium is required!";
    if (!randomValues.temperature) newErrors.temperature = "Temperature is required!";
    if (!randomValues.moisture) newErrors.moisture = "Moisture is required!";
    if (!randomValues.humidity) newErrors.humidity = "Humidity is required!";
    if (!selectedRegion) newErrors.region = "Region selection is required!";
    if (!selectedSoilType) newErrors.soilType = "Soil type selection is required!";
    if (randomValues.moisture < 50) newErrors.moisture = "Moisture must be ≥ 50%";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((error) => toast.error(error));
      return;
    }

    navigate("/results", {
      state: {
        N: randomValues.nitrogen,
        P: randomValues.phosphorus,
        K: randomValues.potassium,
        temperature: randomValues.temperature,
        soil_moisture: randomValues.moisture,
        humidity: randomValues.humidity,
        Region: selectedRegion,
        Soil_Type: selectedSoilType,
      },
    });
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          minHeight: "100vh",
          py: 7,
          px: { xs: 2, sm: 4 },
          background: "linear-gradient(135deg, #0f2027, #203a43, rgb(37, 71, 86))",
          fontFamily: "'Segoe UI', Roboto, sans-serif",
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{
                  color: "#4caf50",
                  textShadow: "0 0 12px rgba(73, 168, 121, 0.8)",
                  textAlign: "left",
                }}
              >
                Crop Recommendation System
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box>
                <Paper
                  elevation={6}
                  sx={{
                    overflowY: "hidden",
                    p: { xs: 2, md: 3 },
                    width: "100%",
                    maxWidth: "750px",
                    borderRadius: "20px",
                    background: "rgba(230, 230, 230, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid #00e67644",
                    boxShadow: "0 6px 20px rgba(58, 131, 94, 0.2)",
                    color: "#fff",
                    ml: 4,
                    mt: 2
                  }}
                >
                  <Grid container spacing={2}>
                    {/* Input Fields */}
                    <Grid item xs={12} md={6}>
                      <InputFields
                        randomValues={randomValues}
                        handleChange={(field, value) =>
                          setRandomValues((prev) => ({ ...prev, [field]: value }))
                        }
                        region={selectedRegion}
                        soilType={selectedSoilType}
                      />
                    </Grid>

                    {/* Region Dropdown */}
                    <Grid item xs={6}>
                      <CustomDropdown
                        label="Region"
                        options={regions}
                        value={selectedRegion}
                        setValue={setSelectedRegion}
                        enableLocation={true}
                      />
                    </Grid>

                    {/* Soil Type Dropdown */}
                    <Grid item xs={6}>
                      <CustomDropdown
                        label="Soil Type"
                        options={soilTypes}
                        value={selectedSoilType}
                        setValue={setSelectedSoilType}
                      />
                    </Grid>

                    {/* Recommendation Button */}
                    <Grid item xs={12} display="flex" justifyContent="center">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <RecommendationButton onClick={handleGetRecommendations} />
                      </motion.div>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CropRecommendationPage;
