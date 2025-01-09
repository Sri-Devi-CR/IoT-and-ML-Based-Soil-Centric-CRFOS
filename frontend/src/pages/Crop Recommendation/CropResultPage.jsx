import React from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function ResultPage() {
  const navigate = useNavigate();
  const randomCrop = ["Rice", "Wheat", "Maize", "Sugarcane", "Cotton"][
    Math.floor(Math.random() * 5)
  ];

  return (
    <MDBContainer
      className="p-4 background-container5"
      fluid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        // backgroundColor:"pink"
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
            Recommended Crop
          </h2>
          <h3
            style={{
              textAlign: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
              color: "white",
              fontFamily: "CWCReg",
              fontSize: "1.8rem",
            }}
          >
            {randomCrop}
          </h3>
          <p
            style={{
              color: "white",
              fontFamily: "CWCReg",
              textAlign: "center",
            }}
          >
            Based on the given soil type, planting season, and nutrient levels,
            {randomCrop} is the most suitable crop for your field. Ensure proper
            irrigation and care for optimal yield.
          </p>
          <MDBBtn
            className="w-100"
            size="md"
            style={{
              backgroundColor: "#81c784",
              color: "#323232",
              fontFamily: "Paris2024",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
            onClick={()=>navigate('/home') }
          >
            Back to Home
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default ResultPage;
