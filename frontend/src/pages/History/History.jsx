import React, { useState } from "react";
import { Container, Card, CardContent, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import CropRecommendationHistory from "./CropRecommendationHistory/CropRecommendationHistory";
import FertilizerHistory from "./FertilizerHistory/FertilizerHistory";

function UserActivity() {
  const [activeTab, setActiveTab] = useState("crop");

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        mt: 2,
      }}
    >
      <Card
        sx={{
          bgcolor: "rgba(50, 50, 50, 0.25)",
          borderRadius: "15px",
          boxShadow: "0 8px 32px 0 rgba(6, 6, 13, 0.37)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          width: "80%",
          maxWidth: "1000px",
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "80vh", 
        }}
      >
        {/* Tab Navigation */}
        <Box sx={{ display: "flex", position: "relative", marginBottom: "1rem" }}>
          {["crop", "fertilizer"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                flex: 1,
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: activeTab === tab ? "#81c784" : "#ccc",
                textTransform: "none",
                position: "relative",
                transition: "color 0.3s ease-in-out",
                padding: "0.8rem",
              }}
            >
              {tab === "crop" ? "Crop Recommendation History" : "Fertilizer Optimization History"}
            </Button>
          ))}

          <motion.div
            key={activeTab}
            style={{
              position: "absolute",
              bottom: 0,
              left: activeTab === "crop" ? "0%" : "50%",
              height: "3px",
              backgroundColor: "#81c784",
              borderRadius: "5px",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "50%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </Box>

        <CardContent
          sx={{
            flex: 1, 
            overflowY: "auto", 
            maxHeight: "calc(100% - 60px)", 
            paddingRight: "8px",
          }}
        >
          {activeTab === "crop" ? (
            <CropRecommendationHistory />
          ) : (
            <FertilizerHistory />
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default UserActivity;
