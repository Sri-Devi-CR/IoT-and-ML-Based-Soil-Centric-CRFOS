import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useUserLocation from "../../Crop Recommendation/components/useUserLocation.jsx";

const Dropdowns = ({
  regions,
  selectedRegion,
  setSelectedRegion,
  soilTypes,
  selectedSoilType,
  setSelectedSoilType,
  crops,
  selectedCrop,
  setSelectedCrop,
}) => {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const { location, error } = useUserLocation();
  const stateToRegionMap = {
    "Andaman & Nicobar": "Island Region (Andaman & Nicobar)",
    "Arunachal Pradesh": "Eastern Himalaya (Assam, W.B., NE states)",
    "Assam": "Eastern Himalaya (Assam, W.B., NE states)",
    "Bihar": "Middle Gangetic Plain (Eastern U.P.)",
    "Chhattisgarh": "Eastern Plateau & Hills",
    "Delhi": "Western Dry Region (Rajasthan)", // Moved from "Western Himalayas"
    "Goa": "West Coast Plains & Ghats",
    "Gujarat": "Gujarat Plains & Hills",
    "Haryana": "Western Dry Region (Rajasthan)",
    "Himachal Pradesh": "Western Himalayas (J & K, H.P.)",
    "Jharkhand": "Eastern Plateau & Hills",
    "Karnataka": "West Coast Plains & Ghats",
    "Kerala": "West Coast Plains & Ghats",
    "Madhya Pradesh": "Central Plateau & Hills",
    "Maharashtra": "Western Plateau",
    "Manipur": "Eastern Himalaya (Assam, W.B., NE states)",
    "Meghalaya": "Eastern Himalaya (Assam, W.B., NE states)",
    "Mizoram": "Eastern Himalaya (Assam, W.B., NE states)",
    "Nagaland": "Eastern Himalaya (Assam, W.B., NE states)",
    "Odisha": "East Coast Plains & Hills",
    "Punjab": "Western Dry Region (Rajasthan)",
    "Rajasthan": "Western Dry Region (Rajasthan)",
    "Sikkim": "Eastern Himalaya (Assam, W.B., NE states)",
    "Tamil Nadu": "East Coast Plains & Hills",
    "Telangana": "Eastern Plateau & Hills",
    "Tripura": "Eastern Himalaya (Assam, W.B., NE states)",
    "Uttar Pradesh": "Middle Gangetic Plain (Eastern U.P.)",
    "Uttarakhand": "Western Himalayas (J & K, H.P.)",
    "West Bengal": "Lower Gangetic Plain (W.B.)",
  };

  const toggleLocationMode = () => {
    setUseCurrentLocation((prev) => !prev);
    if (!useCurrentLocation && location.state) {
      const mappedRegion = stateToRegionMap[location.state] || "Unknown Region";
      setSelectedRegion(mappedRegion);
    } else {
      setSelectedRegion("");
    }
  };

  const dropdownStyle = {
    borderRadius: "6px",
    bgcolor: "rgba(50, 50, 50, 0.5)",
    color: "white",
    backdropFilter: "blur(10px)",
    height: "38px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#81c784",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#81c784",
      borderWidth: "2px",
    },
    "& .MuiSvgIcon-root": {
      color: "#81c784",
    },
    "& .MuiSelect-select": {
      padding: "8px",
      fontSize: "0.9rem",
      color: "white",
    },
  };

  const menuItemStyle = {
    bgcolor: "transparent",
    color: "white",
    "&:hover": { bgcolor: "#81c784", color: "#323232" },
  };

  const dropdowns = [
    { label: "Soil Type*", value: selectedSoilType, setValue: setSelectedSoilType, options: soilTypes },
    { label: "Crop*", value: selectedCrop, setValue: setSelectedCrop, options: crops },
  ];

  return (
    <>
      <Button
        variant="contained"
        sx={{ my: 1, bgcolor: "#81c784", color: "#323232", height: "38px" }}
        onClick={toggleLocationMode}
      >
        {useCurrentLocation ? "Enter Manually" : "Use Current Location"}
      </Button>

      {useCurrentLocation ? (
        <Typography sx={{ color: "white", mb: 1, fontSize: "13px" }}>
          📍 Auto-detected Region: <strong>{location.state || "Fetching..."}</strong>
        </Typography>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
            <InputLabel sx={{ color: "white", fontSize: "13px", "&.Mui-focused": { color: "#81c784" } }}>Region*</InputLabel>
            <Select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              label="Region*"
              required
              sx={dropdownStyle}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "rgba(50, 50, 50, 0.9)",
                    color: "white",
                    backdropFilter: "blur(15px)",
                    borderRadius: "6px",
                    maxHeight: 180,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {regions.map((option) => (
                <MenuItem key={option} value={option} sx={menuItemStyle}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </motion.div>
      )}

      {dropdowns.map((dropdown, index) => (
        <motion.div key={dropdown.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
          <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
            <InputLabel sx={{ color: "white", fontSize: "13px", "&.Mui-focused": { color: "#81c784" } }}>{dropdown.label}</InputLabel>
            <Select
              value={dropdown.value}
              onChange={(e) => dropdown.setValue(e.target.value)}
              label={dropdown.label}
              required
              sx={dropdownStyle}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "rgba(50, 50, 50, 0.9)",
                    color: "white",
                    backdropFilter: "blur(15px)",
                    borderRadius: "6px",
                    maxHeight: 180,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {dropdown.options.map((option) => (
                <MenuItem key={option} value={option} sx={menuItemStyle}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </motion.div>
      ))}
    </>
  );
};

export default Dropdowns;