import React, { useState, useEffect } from "react";
import { TextField, Grid, Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import useUserLocation from "../../Crop Recommendation/components/useUserLocation.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const InputFields = ({ inputs, handleChange, region, soilType }) => {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [useSensorData, setUseSensorData] = useState(false);
  const { location } = useUserLocation(); // Custom hook for getting location
  const [humidity, setHumidity] = useState(inputs.humidity || "");
  const [temperature, setTemperature] = useState(inputs.temperature || "");
  const [moisture, setMoisture] = useState(inputs.moisture || "");
  const [hasFetchedHumidity, setHasFetchedHumidity] = useState(false);
  const [npkValues, setNpkValues] = useState({
    nitrogen: inputs.nitrogen || "",
    phosphorus: inputs.phosphorus || "",
    potassium: inputs.potassium || "",
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
          handleChange({ target: { name: "temperature", value: response.data.temperature } });
          handleChange({ target: { name: "moisture", value: response.data.moisture } });
          setUseSensorData(true);
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        toast.error("Failed to fetch sensor data. Please try again later.");
      }
    } else {
      setTemperature(inputs.temperature || "");
      setMoisture(inputs.moisture || "");
      setUseSensorData(false);
    }
  };

  // Fetch NPK Values from Server
  const fetchNpkValues = async () => {
    if (!temperature || !region || !humidity || !soilType) {
      toast.error("Please enter all required fields before fetching NPK values.");
      return;
    }

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
        handleChange({ target: { name: "nitrogen", value: response.data.predictions.N } });
        handleChange({ target: { name: "phosphorus", value: response.data.predictions.P } });
        handleChange({ target: { name: "potassium", value: response.data.predictions.K } });
      }
    } catch (error) {
      console.error("Error fetching NPK values:", error);
      toast.error("Failed to fetch NPK values. Please try again later.");
    }
  };

  // Toggle Humidity Fetching
  const toggleLocationMode = () => {
    setUseCurrentLocation((prev) => !prev);
    if (!useCurrentLocation) {
      setHumidity("");
      setHasFetchedHumidity(false);
    }
  };

  // Input Style
  const inputStyle = (disabled) => ({
    "& .MuiOutlinedInput-root": {
      color: disabled ? "#888" : "white",
      borderRadius: "8px",
      bgcolor: disabled ? "rgba(80, 80, 80, 0.5)" : "rgba(50, 50, 50, 0.5)",
      height: "42px",
      backdropFilter: "blur(10px)",
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
      "&:hover fieldset": { borderColor: "#81c784" },
      "&.Mui-focused fieldset": { borderColor: "#81c784", borderWidth: "2px" },
    },
    "& .MuiInputLabel-root": {
      color: disabled ? "#bbb" : "white",
      fontFamily: "MyCustomFont",
      fontSize: "14px",
      "&.Mui-focused": { color: "#81c784" },
    },
  });

  const motionConfig = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {/* NPK Inputs */}
      <Grid item xs={12} container spacing={2}>
        {/* First Row: Nitrogen, Phosphorus */}
        <Grid item xs={12} sm={6}>
          <motion.div {...motionConfig} transition={{ delay: 0.1 }}>
            <TextField
              fullWidth
              label="Nitrogen (%)"
              type="number"
              name="nitrogen"
              value={npkValues.nitrogen === "" ? inputs.nitrogen : npkValues.nitrogen}
              onChange={(e) => {
                setNpkValues((prev) => ({ ...prev, nitrogen: e.target.value }));
                handleChange({ target: { name: "nitrogen", value: e.target.value } });
              }}
              required
              sx={inputStyle(useSensorData)}
              disabled={useSensorData}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div {...motionConfig} transition={{ delay: 0.2 }}>
            <TextField
              fullWidth
              label="Phosphorus (%)"
              type="number"
              name="phosphorus"
              value={npkValues.phosphorus === "" ? inputs.phosphorus : npkValues.phosphorus}
              onChange={(e) => {
                setNpkValues((prev) => ({ ...prev, phosphorus: e.target.value }));
                handleChange({ target: { name: "phosphorus", value: e.target.value } });
              }}
              required
              sx={inputStyle(useSensorData)}
              disabled={useSensorData}
            />
          </motion.div>
        </Grid>
        {/* Second Row: Potassium */}
        <Grid item xs={12} container spacing={2}>
        <Grid item xs={6}>
          <motion.div {...motionConfig} transition={{ delay: 0.3 }}>
            <TextField
              fullWidth
              label="Potassium (%)"
              type="number"
              name="potassium"
              value={npkValues.potassium === "" ? inputs.potassium : npkValues.potassium}
              onChange={(e) => {
                setNpkValues((prev) => ({ ...prev, potassium: e.target.value }));
                handleChange({ target: { name: "potassium", value: e.target.value } });
              }}
              required
              sx={inputStyle(useSensorData)}
              disabled={useSensorData}
            />
          </motion.div>
        </Grid>
              {/* Fetch NPK Button */}
      <Grid item xs={6} sm={4}>
        <motion.div {...motionConfig} transition={{ delay: 0.8 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: "#81c784", color: "#fff", height: "50px" }}
            onClick={fetchNpkValues}
          >
            Fetch NPK Values
          </Button>
        </motion.div>
      </Grid>
      </Grid>
      </Grid>

      {/* Temperature, Moisture, and Fetch from Sensor Button */}
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12} sm={4}>
          <motion.div {...motionConfig} transition={{ delay: 0.4 }}>
            <TextField
              fullWidth
              label="Temperature (°C)"
              type="number"
              name="temperature"
              value={temperature}
              onChange={(e) => {
                setTemperature(e.target.value);
                handleChange({ target: { name: "temperature", value: e.target.value } });
              }}
              sx={inputStyle(useSensorData)}
              disabled={useSensorData}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <motion.div {...motionConfig} transition={{ delay: 0.5 }}>
            <TextField
              fullWidth
              label="Moisture (%)"
              type="number"
              name="moisture"
              value={moisture}
              onChange={(e) => {
                setMoisture(e.target.value);
                handleChange({ target: { name: "moisture", value: e.target.value } });
              }}
              sx={inputStyle(useSensorData)}
              disabled={useSensorData}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <motion.div {...motionConfig} transition={{ delay: 0.6 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#81c784", color: "#fff", height: "50px" }}
              onClick={fetchSensorData}
            >
              {useSensorData ? "Enter Manually" : "Fetch from Sensor"}
            </Button>
          </motion.div>
        </Grid>
      </Grid>

      {/* Humidity Input and Button */}
      <Grid item xs={12} sm={15}>
        <motion.div {...motionConfig} transition={{ delay: 0.7 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 5, mt: 1, mb: 1 }}>
            <TextField
              fullWidth
              label="Humidity (%)"
              type="number"
              name="humidity"
              value={humidity}
              onChange={(e) => {
                setHumidity(e.target.value);
                handleChange({ target: { name: "humidity", value: e.target.value } });
              }}
              sx={inputStyle(useCurrentLocation)}
              disabled={useCurrentLocation}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "#81c784", color: "#fff", height: "50px", mr: 8 }}
              onClick={toggleLocationMode}
            >
              {useCurrentLocation ? "Enter Manually" : "Fetch Humidity"}
            </Button>
          </Box>
        </motion.div>
      </Grid>


    </Grid>
  );
};

export default InputFields;