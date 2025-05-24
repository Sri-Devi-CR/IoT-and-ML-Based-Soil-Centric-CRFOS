// import React, { useState, useEffect } from "react";
// import { TextField, Button, Typography } from "@mui/material";
// import useUserLocation from "../../Crop Recommendation/components/useUserLocation.jsx";
// import axios from "axios";

// function EnvironmentalFields({ randomValues, handleChange }) {
//   const [useCurrentLocation, setUseCurrentLocation] = useState(false);
//   const { location } = useUserLocation(); // Custom hook for getting location
//   const [humidity, setHumidity] = useState(randomValues.humidity);
//   const [hasFetched, setHasFetched] = useState(false);
 
//   useEffect(() => {
//     if (useCurrentLocation && location.latitude && location.longitude && !hasFetched) {
//       const fetchHumidity = async () => {
//         try {
//           const response = await axios.get(
//             `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=relative_humidity_2m`
//           );

//           if (response.data?.hourly?.relative_humidity_2m) {
//             const currentHour = new Date().getHours();
//             const humidityValue = response.data.hourly.relative_humidity_2m[currentHour]; // Get the current hour's humidity

//             if (humidityValue !== undefined) {
//               setHumidity(Math.round(humidityValue)); // Round for better readability
//               handleChange("humidity", Math.round(humidityValue));
//               setHasFetched(true); // Prevents multiple calls
//             } else {
//               console.error("Humidity data not available");
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching humidity:", error);
//         }
//       };

//       fetchHumidity();
//     }
//   }, [useCurrentLocation, location.latitude, location.longitude]);

//   const toggleLocationMode = () => {
//     setUseCurrentLocation((prev) => !prev);
//     if (!useCurrentLocation) {
//       setHumidity("Fetching...");
//     } else {
//       setHumidity(randomValues.humidity);
//       setHasFetched(false);
//     }
//   };

//   return (
//     <>
//       <Button
//         variant="contained"
//         sx={{ my: 2, bgcolor: "#81c784", color: "#323232" }}
//         onClick={toggleLocationMode}
//       >
//         {useCurrentLocation ? "Enter Manually" : "Fetch Humidity"}
//       </Button>
//       {useCurrentLocation && (
//         <Typography sx={{ color: "white", mb: 2 }}>
//           📍 Auto-detected Humidity: <strong>{humidity}%</strong>
//         </Typography>
//       )}
//       {!useCurrentLocation && (
//         <TextField
//           label="Humidity (%)*"
//           type="number"
//           value={humidity}
//           onChange={(e) => {
//             setHumidity(e.target.value);
//             handleChange("humidity", e.target.value);
//           }}
//           fullWidth
//           variant="outlined"
//           sx={{
//             mb: 2,
//             borderRadius: "10px",
//             bgcolor: "rgba(50, 50, 50, 0.5)",
//             color: "white",
//             backdropFilter: "blur(10px)",
//             "& .MuiOutlinedInput-root": {
//               color: "white",
//               "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//               "&:hover fieldset": { borderColor: "#81c784" },
//               "&.Mui-focused fieldset": { borderColor: "#81c784", borderWidth: "2px" },
//             },
//             "& .MuiInputLabel-root": {
//               color: "white",
//               fontFamily: "MyCustomFont",
//               "&.Mui-focused": { color: "#81c784" },
//             },
//           }}
//         />
//       )}

// <TextField
//           label="Moisture (%)*"
//           type="number"
//           value={randomValues.moisture}
//           onChange={(e) => {
//             setHumidity(e.target.value);
//             handleChange("moisture", e.target.value);
//           }}
//           fullWidth
//           variant="outlined"
//           sx={{
//             mb: 2,
//             borderRadius: "10px",
//             bgcolor: "rgba(50, 50, 50, 0.5)",
//             color: "white",
//             backdropFilter: "blur(10px)",
//             "& .MuiOutlinedInput-root": {
//               color: "white",
//               "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//               "&:hover fieldset": { borderColor: "#81c784" },
//               "&.Mui-focused fieldset": { borderColor: "#81c784", borderWidth: "2px" },
//             },
//             "& .MuiInputLabel-root": {
//               color: "white",
//               fontFamily: "MyCustomFont",
//               "&.Mui-focused": { color: "#81c784" },
//             },
//           }}
//         />

// <TextField
//           label="Temperature (c)*"
//           type="number"
//           value={randomValues.temperature}
//           onChange={(e) => {
//             setHumidity(e.target.value);
//             handleChange("temperature", e.target.value);
//           }}
//           fullWidth
//           variant="outlined"
//           sx={{
//             mb: 2,
//             borderRadius: "10px",
//             bgcolor: "rgba(50, 50, 50, 0.5)",
//             color: "white",
//             backdropFilter: "blur(10px)",
//             "& .MuiOutlinedInput-root": {
//               color: "white",
//               "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
//               "&:hover fieldset": { borderColor: "#81c784" },
//               "&.Mui-focused fieldset": { borderColor: "#81c784", borderWidth: "2px" },
//             },
//             "& .MuiInputLabel-root": {
//               color: "white",
//               fontFamily: "MyCustomFont",
//               "&.Mui-focused": { color: "#81c784" },
//             },
//           }}
//         />
//     </>
//   );
// }

// export default EnvironmentalFields;
