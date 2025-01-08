import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";

const ResultPage = () => {
  const location = useLocation();
  const { data } = location.state || { data: {} };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Recommendation Results
      </Typography>
      {data?.recommendedCrops ? (
        <Box>
          {data.recommendedCrops.map((crop, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{crop.name}</Typography>
                <Typography variant="body2">{crop.details}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" align="center" color="textSecondary">
          No recommendations available.
        </Typography>
      )}
    </Container>
  );
};

export default ResultPage;
