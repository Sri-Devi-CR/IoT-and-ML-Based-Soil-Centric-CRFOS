import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { motion } from "framer-motion";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./fertilizerOptimization.css"; // Custom CSS

function FertilizerOptimization() {
  const navigate = useNavigate();
  const [randomValues, setRandomValues] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
  });
  const [crop, setCrop] = useState("");
  const [location, setLocation] = useState("");
  const [landSize, setLandSize] = useState("");

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
      <motion.div
        initial={{ y: "10vw", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <MDBCard
          className="glass-effect"
          style={{
            marginTop:"40px",
            background: "rgba(50, 50, 50, 0.25)",
            borderRadius: "15px",
            boxShadow: "0 8px 32px 0 rgba(6, 6, 13, 0.37)",
            transition:"backdropFilter 10s",
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
              Fertilizer Optimization
            </h2>

            {/* NPK Fields */}
            <MDBInput
              wrapperClass="mb-4"
              label="Nitrogen (N)"
              id="formN"
              type="text"
              value={randomValues.nitrogen}
              readOnly
              style={{
                borderRadius: "5px",
                border: "1px dashed #111111",
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
                border: "1px dashed #111111",
                backgroundColor: "rgba(50,50,50,0.5)",
                color: "white",
                fontFamily: "CWCReg",
              }}
              labelStyle={{ color: "white", fontFamily: "MyCustomFont" }}
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Potassium (K)"
              id="formK"
              type="text"
              value={randomValues.potassium}
              readOnly
              style={{
                borderRadius: "5px",
                border: "1px dashed #111111",
                backgroundColor: "rgba(50,50,50,0.5)",
                color: "white",
                fontFamily: "CWCReg",
              }}
              labelStyle={{ color: "white", fontFamily: "MyCustomFont" }}
            />

            {/* Location Input */}
            <MDBInput
              wrapperClass="mb-2"
              label="Location"
              id="location"
              type="text"
              value={location}
                          onChange={(e) => setLocation(e.target.value)}
                
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

            {/* Crop Dropdown */}
            <FormControl variant="standard" fullWidth sx={{ mb: 4 }}>
              <InputLabel
                sx={{
                  color: "rgba(255,255,255,1)",
                  fontFamily: "MyCustomFont",
                  //   backgroundColor: "pink",
                  paddingLeft: "10px",
                }}
              >
                Crop Choice
              </InputLabel>
              <Select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                label="Crop Choice"
                defaultValue=""
                sx={{
                  borderRadius: "5px",
                  border: "1px solid #dedede",
                  backgroundColor: "rgba(50,50,50,0.5)",
                  color: "white",
                  paddingLeft: "10px",
                  fontFamily: "CWCReg",
                  "& .MuiSelect-select": {
                    fontSize: "1rem",
                    backgroundColor: "rgba(50,50,50,0)",
                  },
                }}
              >
                <MenuItem value="Rice">Rice</MenuItem>
                <MenuItem value="Wheat">Wheat</MenuItem>
                <MenuItem value="Maize">Maize</MenuItem>
                <MenuItem value="Cotton">Cotton</MenuItem>
                <MenuItem value="Sugarcane">Sugarcane</MenuItem>
              </Select>
            </FormControl>

            {/* Land Size Input */}
            <MDBInput
              wrapperClass="mb-4"
              label="Land Size (in acres)"
              id="landSize"
              type="number"
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
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
              onClick={() => navigate("/results2")}
            >
              Get Fertilizer Recommendation
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </motion.div>
    </MDBContainer>
  );
}

export default FertilizerOptimization;
