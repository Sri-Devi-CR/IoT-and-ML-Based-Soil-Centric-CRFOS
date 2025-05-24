// import React from "react";
// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// function SoilTypeDropdown({ soilTypes, selectedSoilType, setSelectedSoilType }) {
//   return (
//     <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
//     <InputLabel
//       sx={{
//         color: "white",
//         fontFamily: "MyCustomFont",
//         "&.Mui-focused": { color: "#81c784" },
//       }}
//     >
//       Soil Type*
//     </InputLabel>
//     <Select
//       value={selectedSoilType}
//       onChange={(e) => setSelectedSoilType(e.target.value)}
//       label="Soil Type"
//       required
//       sx={{
//         borderRadius: "10px",
//         bgcolor: "rgba(50, 50, 50, 0.5)",
//         color: "white",
//         backdropFilter: "blur(10px)",
//         "& .MuiOutlinedInput-notchedOutline": {
//           borderColor: "rgba(255, 255, 255, 0.3)",
//         },
//         "&:hover .MuiOutlinedInput-notchedOutline": {
//           borderColor: "#81c784",
//         },
//         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//           borderColor: "#81c784",
//           borderWidth: "2px",
//         },
//         "& .MuiSvgIcon-root": {
//           color: "#81c784",
//         },
//         "& .MuiSelect-select": {
//           padding: "12px",
//           fontSize: "1rem",
//           color: "white",
//         },
//       }}
//       MenuProps={{
//         PaperProps: {
//           sx: {
//             bgcolor: "rgba(50, 50, 50, 0.9)",
//             color: "white",
//             backdropFilter: "blur(15px)",
//             borderRadius: "10px",
//             maxHeight: 200,
//             overflowY: "auto",
//           },
//         },
//       }}
//     >
//       {soilTypes.map((soilType) => (
//         <MenuItem
//           key={soilType}
//           value={soilType}
//           sx={{
//             bgcolor: "transparent",
//             color: "white",
//             "&:hover": { bgcolor: "#81c784", color: "#323232" },
//           }}
//         >
//           {soilType}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
//   );
// }

// export default SoilTypeDropdown;