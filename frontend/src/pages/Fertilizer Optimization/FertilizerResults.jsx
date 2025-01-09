import React from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit";

function FertilizerResults() {
  const randomFertilizerValues = {
    nitrogen: Math.floor(Math.random() * 50 + 50),
    phosphorus: Math.floor(Math.random() * 50 + 50),
    potassium: Math.floor(Math.random() * 50 + 50),
  };

  return (
    <MDBContainer
      className="p-4"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <MDBCard
        style={{
          background: "rgba(50, 50, 50, 0.25)",
          borderRadius: "15px",
          boxShadow: "0 8px 32px 0 rgba(6, 6, 13, 0.37)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          padding: "2rem",
          maxWidth: "500px",
        }}
      >
        <MDBCardBody>
          <h2
            style={{
              textAlign: "center",
              color: "#81c784",
              fontFamily: "Paris2024",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Fertilizer Recommendation
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "CWCReg",
              marginBottom: "1.5rem",
            }}
          >
            Based on the crop and land size, apply the following fertilizer
            values per acre for optimal growth:
          </p>

          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              color: "white",
              fontFamily: "CWCReg",
              fontSize: "1.2rem",
            }}
          >
            <li>Nitrogen: {randomFertilizerValues.nitrogen} kg</li>
            <li>Phosphorus: {randomFertilizerValues.phosphorus} kg</li>
            <li>Potassium: {randomFertilizerValues.potassium} kg</li>
          </ul>

          <MDBBtn
            className="w-100 mt-4"
            size="md"
            style={{
              backgroundColor: "#81c784",
              borderRadius: "5px",
              color: "#323232",
              fontFamily: "Paris2024",
              fontWeight: "bold",
            }}
          >
            Back to Home
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default FertilizerResults;
