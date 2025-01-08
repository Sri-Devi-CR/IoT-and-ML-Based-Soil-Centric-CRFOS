import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { submitCropRecommendation } from "../services/api";

const soilTypes = ["Sandy", "Loamy", "Clayey", "Silty"];

const CropRecommendationPage = () => {
  const [formData, setFormData] = useState({
    location: "",
    plantingSeason: "",
    soilType: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await submitCropRecommendation(formData);
      navigate("/results", { state: { data: response.data } });
    } catch (error) {
      console.error("Error submitting data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Crop Recommendation
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Planting Season"
          name="plantingSeason"
          value={formData.plantingSeason}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Soil Type"
          name="soilType"
          value={formData.soilType}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 3 }}
        >
          {soilTypes.map((soil) => (
            <MenuItem key={soil} value={soil}>
              {soil}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </Box>
    </Container>
  );
};

export default CropRecommendationPage;
