import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate=useNavigate()
  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden background-container2 "
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{
              color: "hsl(218, 81%, 95%)",
                fontFamily: "Paris2024",
                // backgroundColor: "pink",
              marginRight: "40px"
            }}
          >
            Sow the seeds <br />
            <span
              style={{
                color: "#cba249",
              }}
            >
              for your success
            </span>
          </h1>

          <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}></p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard
            className="my-5 glass-effect"
            style={{
              background: "rgba(50, 50, 50, 0.25)", // Semi-transparent background
              borderRadius: "15px", // Rounded corners
              boxShadow: "0 8px 32px 0 rgba(6, 6, 13, 0.37)", // Subtle shadow
              backdropFilter: "blur(20px)", // Blur effect
              WebkitBackdropFilter: "blur(10px)", // Safari support
              border: "1px solid rgba(255, 255, 255, 0.18)", // Subtle border
              paddingTop: "2%",
              paddingBottom: "8%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MDBCardBody
              className="p-5 mt-5"
              style={{
                // Adjust background color to match farming theme
                borderRadius: "10px",
                color: "white",
              }}
            >
              {/* Heading */}
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "2rem",
                  color: "#81c784",
                  fontFamily: "Paris2024",
                  fontSize: "200%",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </h2>

              <MDBRow className="mb-0">
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First Name"
                    id="form1"
                    type="text"
                    style={{
                      borderRadius: "5px",
                      border: "1px dashed #111111",
                      backgroundColor: "rgba(50,50,50,0.5)", // Dark grey background for text field
                      color: "white",
                      fontFamily: "CWCReg",
                    }}
                    inputStyle={{
                      fontSize: "1rem",
                      padding: "10px",
                      backgroundColor: "rgba(50,50,50,0.2)", // Dark grey background for text field
                      color: "white", // Text color inside input
                      fontFamily: "CWCReg",
                    }}
                    labelStyle={{
                      color: "white", // White color for label
                      fontFamily: "MyCustomFont",
                    }}
                    focus={{
                      borderColor: "grey", // Grey border on focus
                      boxShadow: "none", // Remove default blue shadow on focus
                    }}
                  />
                </MDBCol>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last Name"
                    id="form2"
                    type="text"
                    style={{
                      borderRadius: "5px",
                      border: "1px dashed #111111",
                      backgroundColor: "rgba(50,50,50,0.5)", // Dark grey background for text field
                      color: "white",
                      fontFamily: "CWCReg",
                    }}
                    inputStyle={{
                      fontSize: "1rem",
                      padding: "10px",
                      backgroundColor: "rgba(50,50,50,0.2)", // Dark grey background for text field
                      color: "white", // Text color inside input
                      fontFamily: "CWCReg",
                    }}
                    labelStyle={{
                      color: "white", // White color for label
                      fontFamily: "MyCustomFont",
                    }}
                    focus={{
                      borderColor: "grey", // Grey border on focus
                      boxShadow: "none", // Remove default blue shadow on focus
                    }}
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="email"
                style={{
                  borderRadius: "5px",
                  border: "1px dashed #111111",
                  backgroundColor: "rgba(50,50,50,0.5)", // Dark grey background for text field
                  color: "white",
                  fontFamily: "CWCReg",
                }}
                inputStyle={{
                  fontSize: "1rem",
                  padding: "10px",
                  backgroundColor: "rgba(50,50,50,0.2)", // Dark grey background for text field
                  color: "white", // Text color inside input
                  fontFamily: "CWCReg",
                }}
                labelStyle={{
                  color: "white", // White color for label
                  fontFamily: "MyCustomFont",
                }}
                focus={{
                  borderColor: "grey", // Grey border on focus
                  boxShadow: "none", // Remove default blue shadow on focus
                }}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
                style={{
                  borderRadius: "5px",
                  border: "1px dashed #111111",
                  backgroundColor: "rgba(50,50,50,0.5)", // Dark grey background for text field
                  color: "white",
                  fontFamily: "CWCReg",
                }}
                inputStyle={{
                  fontSize: "1rem",
                  padding: "10px",
                  backgroundColor: "rgba(50,50,50,0.2)", // Dark grey background for text field
                  color: "white", // Text color inside input
                  fontFamily: "CWCReg",
                }}
                labelStyle={{
                  color: "white", // White color for label
                  fontFamily: "MyCustomFont",
                }}
                focus={{
                  borderColor: "grey", // Grey border on focus
                  boxShadow: "none", // Remove default blue shadow on focus
                }}
              />

              <MDBBtn
                className="w-100 mb-4"
                size="md"
                style={{
                  backgroundColor: "#81c784",
                  borderRadius: "5px",
                  color: "#323232",
                  fontWeight: "bold",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                }}
                onClick={()=>navigate('/login')}
              >
                Sign Up
              </MDBBtn>

              <div className="text-center">
                              <p style={{
                                  color: "white",
                              fontFamily:"CWCReg"}}>
                  Already have an account?
                  <a
                    href="/login"
                    style={{
                      color: "#81c784",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Login
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
