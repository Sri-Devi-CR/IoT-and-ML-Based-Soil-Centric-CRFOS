import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Box, CssBaseline } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import InputFields from "./components/InputFields";
import Dropdowns from "./components/Dropdowns";
import ActionButton from "./components/ActionButton";
import "./fertilizerOptimization.css";

const FertilizerOptimization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state || {};
  console.log("received data:", receivedData.entry);

  const [inputs, setInputs] = useState({
    nitrogen: receivedData?.entry?.N || "",
    phosphorus: receivedData?.entry?.P || "",
    potassium: receivedData?.entry?.K || "",
    temperature: receivedData?.entry?.temperature || "",
    moisture: receivedData?.entry?.soil_moisture_range || "",
    humidity: receivedData?.entry?.humidity || "",
  });

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(receivedData?.entry?.Region || "");
  const [soilTypes, setSoilTypes] = useState([]);
  const [selectedSoilType, setSelectedSoilType] = useState(receivedData?.entry?.Soil_Type || "");
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(receivedData?.entry?.Crop || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("http://localhost:4200/soil-data/regions");
        setRegions(response.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchSoilTypes = async () => {
      if (selectedRegion) {
        try {
          const response = await axios.get(
            `http://localhost:4200/soil-data/soil-types/${selectedRegion}`
          );
          setSoilTypes(response.data);
        } catch (error) {
          console.error("Error fetching soil types:", error);
        }
      } else {
        setSoilTypes([]);
      }
    };
    fetchSoilTypes();
  }, [selectedRegion]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:4200/soil-data/crops");
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };
    fetchCrops();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetRecommendations = () => {
    const newErrors = {};
    if (!inputs.nitrogen) newErrors.nitrogen = "Nitrogen is required!";
    if (!inputs.phosphorus) newErrors.phosphorus = "Phosphorus is required!";
    if (!inputs.potassium) newErrors.potassium = "Potassium is required!";
    if (!inputs.temperature) newErrors.temperature = "Temperature is required!";
    if (!inputs.moisture) newErrors.moisture = "Moisture is required!";
    if (!inputs.humidity) newErrors.humidity = "Humidity is required!";
    if (!selectedRegion) newErrors.region = "Region selection is required!";
    if (!selectedSoilType) newErrors.soilType = "Soil type is required!";
    if (!selectedCrop) newErrors.crop = "Crop selection is required!";
    if (parseFloat(inputs.moisture) < 50) newErrors.moisture = "Moisture must be greater than or equal to 50%";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((error) => toast.error(error));
      return;
    }

    const requestBody = {
      N: parseFloat(inputs.nitrogen),
      P: parseFloat(inputs.phosphorus),
      K: parseFloat(inputs.potassium),
      soil_moisture_range: parseFloat(inputs.moisture),
      temperature: parseFloat(inputs.temperature),
      humidity: parseFloat(inputs.humidity),
      Region: selectedRegion,
      Soil_Type: selectedSoilType,
      Crop: selectedCrop,
    };
    console.log("request body in main:", requestBody);
    navigate("/results2", { state: { requestBody, receivedData } });
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xl"
        disableGutters
        className="background-container6"
        sx={{
          height: "100vh",
          py: 6,
          px: { xs: 2, sm: 4 },
          background: "linear-gradient(135deg, #0f2027, #203a43, #254756)",
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h3" align="center" fontWeight={700} sx={{ mb: 4, mr: 5, color: "#4caf50", textShadow: "0 0 12px rgba(73, 168, 121, 0.8)" }}>
            Fertilizer Optimization System
          </Typography>
        </motion.div>

        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
          <Box display="flex" justifyContent="center">
            <Paper elevation={6} sx={{ mt: 8, p: { xs: 2, md: 5 }, width: "100%", maxWidth: "950px", borderRadius: "24px", background: "rgba(230, 230, 230, 0.06)", backdropFilter: "blur(12px)", border: "1px solid #00e67644", boxShadow: "0 10px 30px rgba(58, 131, 94, 0.2)", color: "#fff" }}>
              <InputFields inputs={inputs} handleChange={handleChange} region={selectedRegion} soilType={selectedSoilType} />
              <Dropdowns
                regions={regions}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                soilTypes={soilTypes}
                selectedSoilType={selectedSoilType}
                setSelectedSoilType={setSelectedSoilType}
                crops={crops}
                selectedCrop={selectedCrop}
                setSelectedCrop={setSelectedCrop}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ActionButton onClick={handleGetRecommendations} />
              </motion.div>
            </Paper>
          </Box>
        </motion.div>
      </Container>
    </>
  );
};

export default FertilizerOptimization;
