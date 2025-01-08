import React from 'react';
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
} from 'mdb-react-ui-kit';
import { Container } from '@mui/material';
import './login.css'; // Add a CSS file for styles

function Login() {
  return (

    <MDBContainer
      fluid
      className="p-4 background-container overflow-hidden"
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: 'hsl(218, 81%, 95%)' }}
          >
            The best offer <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>
              for your business
            </span>
          </h1>

          <p className="px-3" style={{ color: 'hsl(218, 81%, 85%)' }}>
            Welcome to our platform. Unlock new opportunities by logging in today!
          </p>
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
            className="my-5"
            style={{
              background: "rgba(70, 170, 47, 0.25)", // Semi-transparent background
              borderRadius: "15px", // Rounded corners
              boxShadow: "0 8px 32px 0 rgba(6, 6, 13, 0.37)", // Subtle shadow
              backdropFilter: "blur(10px)", // Blur effect
              WebkitBackdropFilter: "blur(10px)", // Safari support
              border: "1px solid rgba(255, 255, 255, 0.18)", // Subtle border
            }}
          >
            <MDBCardBody className="p-5">
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="email"
                
                
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"

                style={{color:"white"}}
              />

              

              <MDBBtn className="w-100 mb-4" size="md">
                Log in
              </MDBBtn>

              <div className="text-center">

                <p style={{color:"white"}}>Don't have an account?  <a href="/register">Register</a></p>
              </div>

              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

  );
}

export default Login;
