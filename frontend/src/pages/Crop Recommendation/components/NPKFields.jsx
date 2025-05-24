import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import useUserLocation from "../../Crop Recommendation/components/useUserLocation.jsx";
import axios from "axios";

function InputFields({ randomValues, handleChange, region, soilType }) {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const { location } = useUserLocation();
  const [humidity, setHumidity] = useState(randomValues.humidity);
  const [temperature, setTemperature] = useState(randomValues.temperature);
  const [moisture, setMoisture] = useState(randomValues.moisture);
  const [hasFetchedHumidity, setHasFetchedHumidity] = useState(false);
  const [useSensorData, setUseSensorData] = useState(false);
  const [npkValues, setNpkValues] = useState({
    nitrogen: randomValues.nitrogen,
    phosphorus: randomValues.phosphorus,
    potassium: randomValues.potassium,
  });

  // Fetch Humidity API
  useEffect(() => {
    if (useCurrentLocation && location.latitude && location.longitude && !hasFetchedHumidity) {
      const fetchHumidity = async () => {
        try {
          // Trim latitude and longitude to remove any extra spaces
          const trimmedLatitude = String(location.latitude).trim();
          const trimmedLongitude = String(location.longitude).trim();

          // Log the trimmed values for debugging
          console.log("Original Latitude:", location.latitude);
          console.log("Original Longitude:", location.longitude);
          console.log("Trimmed Latitude:", trimmedLatitude);
          console.log("Trimmed Longitude:", trimmedLongitude);

          // Construct the URL without any extra spaces
          const url = `https://api.open-meteo.com/v1/forecast?latitude= ${trimmedLatitude}&longitude=${trimmedLongitude}&hourly=relative_humidity_2m`;

          // Log the constructed URL for debugging
          console.log("Constructed URL:", url);

          // Remove any spaces from the URL (just to be safe)
          const sanitizedUrl = url.replace(/\s+/g, '');

          // Log the sanitized URL for debugging
          console.log("Sanitized URL:", sanitizedUrl);

          const response = await axios.get(sanitizedUrl);

          if (response.data?.hourly?.relative_humidity_2m) {
            const currentHour = new Date().getHours();
            const humidityValue = response.data.hourly.relative_humidity_2m[currentHour];

            if (humidityValue !== undefined) {
              setHumidity(Math.round(humidityValue));
              handleChange("humidity", Math.round(humidityValue));
              setHasFetchedHumidity(true);
            }
          }
        } catch (error) {
          console.error("Error fetching humidity:", error);
          console.error("Error response:", error.response); // Debugging line
        }
      };
      fetchHumidity();
    }
  }, [useCurrentLocation, location.latitude, location.longitude, hasFetchedHumidity]);

  // Fetch Sensor Data API (Temperature & Moisture)
  const fetchSensorData = async () => {
    if (!useSensorData) {
      try {
        const response = await axios.get("http://localhost:4200/fetch-sensor-data");
        if (response.data) {
          setTemperature(response.data.temperature);
          setMoisture(response.data.moisture);
          handleChange("temperature", response.data.temperature);
          handleChange("moisture", response.data.moisture);
          setUseSensorData(true);
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    } else {
      setTemperature(randomValues.temperature);
      setMoisture(randomValues.moisture);
      setUseSensorData(false);
    }
  };

  // Fetch NPK Values from Server
  const fetchNpkValues = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict-npk", {
        temperature: parseFloat(temperature),
        Region: region,
        humidity: parseFloat(humidity),
        Soil_Type: soilType,
      });

      if (response.data && response.data.predictions) {
        setNpkValues({
          nitrogen: response.data.predictions.N,
          phosphorus: response.data.predictions.P,
          potassium: response.data.predictions.K,
        });
        handleChange("nitrogen", response.data.predictions.N);
        handleChange("phosphorus", response.data.predictions.P);
        handleChange("potassium", response.data.predictions.K);
      }
    } catch (error) {
      console.error("Error fetching NPK values:", error);
    }
  };

  // Toggle Humidity Fetching
  const toggleLocationMode = () => {
    setUseCurrentLocation((prev) => !prev);
    if (!useCurrentLocation) {
      setHumidity("Fetching...");
    } else {
      setHumidity(randomValues.humidity);
      setHasFetchedHumidity(false);
    }
  };

  // Input Style
  const inputStyle = (disabled) => ({
    "& .MuiOutlinedInput-root": {
      color: disabled ? "#888" : "white",
      borderRadius: "8px",
      bgcolor: disabled ? "rgba(80, 80, 80, 0.5)" : "rgba(50, 50, 50, 0.5)",
      backdropFilter: "blur(5px)",
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
      "&:hover fieldset": { borderColor: "#81c784" },
      "&.Mui-focused fieldset": { borderColor: "#81c784", borderWidth: "2px" },
    },
    "& .MuiInputLabel-root": {
      color: disabled ? "#bbb" : "white",
      fontFamily: "MyCustomFont",
      "&.Mui-focused": { color: "#81c784" },
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Humidity */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          fullWidth
          type="number"
          label="Humidity (%)"
          value={humidity}
          onChange={(e) => {
            setHumidity(e.target.value);
            handleChange("humidity", e.target.value);
          }}
          sx={inputStyle(useCurrentLocation)}
          disabled={useCurrentLocation}
        />
        <Button variant="contained" sx={{ bgcolor: "#81c784", color: "#fff", minWidth: "120px", height: "50px" }} onClick={toggleLocationMode}>
          {useCurrentLocation ? "Enter Manually" : "Fetch Humidity"}
        </Button>
      </Box>

      {/* Temperature & Moisture */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          type="number"
          label="Temperature (°C)"
          value={temperature}
          onChange={(e) => {
            setTemperature(e.target.value);
            handleChange("temperature", e.target.value);
          }}
          sx={inputStyle(useSensorData)}
          disabled={useSensorData}
        />
        <TextField
          fullWidth
          type="number"
          label="Moisture (%)"
          value={moisture}
          onChange={(e) => {
            setMoisture(e.target.value);
            handleChange("moisture", e.target.value);
          }}
          sx={inputStyle(useSensorData)}
          disabled={useSensorData}
        />
      </Box>

      <Button variant="contained" sx={{ bgcolor: "#81c784", color: "#fff" }} onClick={fetchSensorData} fullWidth>
        {useSensorData ? "Enter Manually" : "Fetch from Sensor"}
      </Button>

      {/* NPK Values */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {["nitrogen", "phosphorus", "potassium"].map((field) => (
          <TextField
            key={field}
            fullWidth
            type="number"
            label={field.charAt(0).toUpperCase() + field.slice(1) + " (%)"}
            value={npkValues[field]}
            onChange={(e) => {
              setNpkValues((prev) => ({
                ...prev,
                [field]: e.target.value,
              }));
              handleChange(field, e.target.value);
            }}
            sx={inputStyle(useSensorData)}
            disabled={useSensorData}
          />
        ))}
      </Box>

      {/* Fetch NPK Button */}
      <Button variant="contained" sx={{ bgcolor: "#81c784", color: "#fff" }} onClick={fetchNpkValues} fullWidth>
        Fetch NPK Values
      </Button>
    </Box>
  );
}

export default InputFields;