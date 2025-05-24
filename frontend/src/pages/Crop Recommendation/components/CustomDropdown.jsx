import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@mui/material";
import useUserLocation from "./useUserLocation.jsx";

// Mapping of Indian states to encoded regions
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

function CustomDropdown({ label, options, value, setValue, enableLocation = false }) {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const { location } = useUserLocation();

  const toggleLocationMode = () => {
    setUseCurrentLocation((prev) => !prev);
    if (!useCurrentLocation && location.state) {
      const mappedRegion = stateToRegionMap[location.state] || "Unknown Region";
      setValue(mappedRegion);
    } else {
      setValue("");
    }
  };

  return (
    <>
      {enableLocation && (
        <Button
          variant="contained"
          sx={{ my: 2, bgcolor: "#81c784", color: "#323232" }}
          onClick={toggleLocationMode}
        >
          {useCurrentLocation ? "Enter Manually" : "Use Current Location"}
        </Button>
      )}

      {enableLocation && useCurrentLocation ? (
        <Typography sx={{ color: "white", mb: 2 }}>
          📍 Auto-detected {label}: <strong>{location.state || "Fetching..."}</strong>
        </Typography>
      ) : (
        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
          <InputLabel
            sx={{
              color: "white",
              fontFamily: "MyCustomFont",
              "&.Mui-focused": { color: "#81c784" },
            }}
          >
            {label}*
          </InputLabel>
          <Select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label={label}
            required
            sx={{
              borderRadius: "10px",
              bgcolor: "rgba(50, 50, 50, 0.5)",
              color: "white",
              backdropFilter: "blur(10px)",
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
                padding: "12px",
                fontSize: "1rem",
                color: "white",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "rgba(50, 50, 50, 0.9)",
                  color: "white",
                  backdropFilter: "blur(15px)",
                  borderRadius: "10px",
                  maxHeight: 200,
                  overflowY: "auto",
                },
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  bgcolor: "transparent",
                  color: "white",
                  "&:hover": { bgcolor: "#81c784", color: "#323232" },
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}

export default CustomDropdown;
