import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { motion } from "framer-motion";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"; // Import Material-UI components
import "./cropRecommendation.css"; // Custom CSS
import { useNavigate } from "react-router-dom";

function CropRecommendationPage() {
  const navigate = useNavigate();
  const [randomValues, setRandomValues] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
  });
  const [soilType, setSoilType] = useState("");
  const [plantingSeason, setPlantingSeason] = useState("");

  // Generate random values for N, P, K when the component mounts
  useEffect(() => {
    setRandomValues({
      nitrogen: Math.floor(Math.random() * 100),
      phosphorus: Math.floor(Math.random() * 100),
      potassium: Math.floor(Math.random() * 100),
    });
  }, []);

  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden background-container3"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* Framer Motion Animation for Sliding In */}
      <motion.div
        initial={{ y: "10vw", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <MDBCard
          className="glass-effect"
          style={{
            background: "rgba(50, 50, 50, 0.25)", // Glassmorphism effect
            borderRadius: "15px",
            boxShadow: "0 8px 32px 0 rgba(6, 6, 13, 0.37)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            padding: "2rem",
          }}
        >
          <MDBCardBody>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                color: "#81c784",
                fontFamily: "Paris2024",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              Crop Recommendation
            </h2>

            {/* N, P, K Fields */}
            <MDBInput
              wrapperClass="mb-4"
              label="Nitrogen (N)"
              id="formN"
              type="text"
              value={randomValues.nitrogen}
              readOnly
              style={{
                borderRadius: "5px",
                backgroundColor: "rgba(50,50,50,0.5)",
                color: "white",
                fontFamily: "CWCReg",
              }}
              labelStyle={{ color: "white", fontFamily: "MyCustomFont" }}
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Phosphorus (P)"
              id="formP"
              type="text"
              value={randomValues.phosphorus}
              readOnly
              style={{
                borderRadius: "5px",
                backgroundColor: "rgba(50,50,50,0.5)",
                color: "white",
                fontFamily: "CWCReg",
              }}
              labelStyle={{ color: "white", fontFamily: "MyCustomFont" }}
            />

            <MDBInput
              wrapperClass="mb-2"
              label="Potassium (K)"
              id="formK"
              type="text"
              value={randomValues.potassium}
              readOnly
              style={{
                borderRadius: "5px",
                backgroundColor: "rgba(50,50,50,0.5)",
                color: "white",
                fontFamily: "CWCReg",
              }}
              labelStyle={{ color: "white", fontFamily: "MyCustomFont" }}
            />

            {/* Soil Type Dropdown */}
            <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
              <InputLabel
                sx={{
                  color: "white",
                  fontFamily: "MyCustomFont",
                  paddingLeft:"10px"
                }}
              >
                Soil Type
              </InputLabel>
              <Select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                label="Soil Type"
                defaultValue=""
                sx={{
                  borderRadius: "5px",
                  border: "1px solid #dedede",
                  backgroundColor: "rgba(50,50,50,0.5)",
                  color: "white",
                  paddingLeft:"10px",
                  fontFamily: "CWCReg",
                  "& .MuiSelect-select": {
                    color: "white",
                    fontSize: "1rem",
                    backgroundColor: "rgba(50,50,50,0)",
                  },
                }}
              >
                <MenuItem value="loamy">Loamy</MenuItem>
                <MenuItem value="clay">Clay</MenuItem>
                <MenuItem value="sandy">Sandy</MenuItem>
              </Select>
            </FormControl>

            {/* Planting Season Dropdown */}
            <FormControl variant="standard" fullWidth sx={{ mb: 4 }}>
              <InputLabel
                sx={{
                  color: "white",
                  fontFamily: "MyCustomFont",
                  paddingLeft:"10px"
                }}
              >
                Planting Season
              </InputLabel>
              <Select
                value={plantingSeason}
                onChange={(e) => setPlantingSeason(e.target.value)}
                label="Planting Season"
                defaultValue=""
                sx={{
                  borderRadius: "5px",
                  border: "1px solid #dedede",
                  backgroundColor: "rgba(50,50,50,0.5)",
                  color: "white",
                  paddingLeft:"10px",
                  fontFamily: "CWCReg",
                  "& .MuiSelect-select": {
                    fontSize: "1rem",
                    backgroundColor: "rgba(50,50,50,0)",
                    color: "white",
                  },
                }}
              >
                <MenuItem value="kharif">Kharif</MenuItem>
                <MenuItem value="rabi">Rabi</MenuItem>
                <MenuItem value="summer">Summer</MenuItem>
              </Select>
            </FormControl>
            <MDBInput
              wrapperClass="mb-4"
              label="Location"
              id="formN"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px dashed #111111",
                backgroundColor: "rgba(50,50,50,0.5)",
                color: "white",
                fontFamily: "CWCReg",
              }}
              labelStyle={{
                color: "white",
                fontFamily: "MyCustomFont",
              }}
            />

            {/* Button */}
            <MDBBtn
              className="w-100"
              size="md"
              style={{
                backgroundColor: "#81c784",
                borderRadius: "5px",
                color: "#323232",
                fontFamily: "Paris2024",
                fontWeight: "bold",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
              }}
              onClick={() => navigate("/results")}
            >
              Get Recommendations
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </motion.div>
    </MDBContainer>
  );
}

export default CropRecommendationPage;
