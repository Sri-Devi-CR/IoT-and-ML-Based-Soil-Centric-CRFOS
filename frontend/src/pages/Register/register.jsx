import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from "mdb-react-ui-kit";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../services/authContext";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errorSnackbar, setErrorSnackbar] = useState({ open: false, message: "" });
  const [successSnackbar, setSuccessSnackbar] = useState({ open: false, message: "" });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const { user } = useAuth() 
    useEffect(()=>{
      if(user){
        navigate("/dashboard")
      }
      else{
        return
      }
    })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    setErrorSnackbar({ open: false, message: "" });
    setSuccessSnackbar({ open: false, message: "" });
  
    if (!formData.username.trim()) {
      setErrorSnackbar({ open: true, message: "Username is required." });
      setLoading(false);
      return;
    }
  
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrorSnackbar({ open: true, message: "Enter a valid email address." });
      setLoading(false);
      return;
    }
  
    if (formData.password.length < 6) {
      setErrorSnackbar({ open: true, message: "Password must be at least 6 characters." });
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4200/auth/register", formData);
      const { user, token } = response.data;

      localStorage.setItem("CRFOuser", JSON.stringify(user));
      localStorage.setItem("CRFOtoken", token);
      const loggedinuser = localStorage.getItem("CRFOuser");
      console.log("logged in:", loggedinuser)
      setSuccessSnackbar({ open: true, message: "Registration successful! Redirecting..." });
  
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
  
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Try again.";
      setErrorSnackbar({ open: true, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden background-container2">
      <MDBRow>
        <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: "hsl(218, 81%, 95%)", fontFamily: "Paris2024" }}>
            Sow the seeds <br />
            <span style={{ color: "#cba249" }}>for your success</span>
          </h1>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <MDBCard className="glass-effect" style={{
            background: "rgba(50, 50, 50, 0.25)",
            borderRadius: "15px",
            boxShadow: "0 8px 32px 0 rgba(6, 6, 13, 0.37)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            marginTop: "70px"
          }}>
            <MDBCardBody className="p-5 mt-5" style={{ borderRadius: "10px", color: "white" }}>
              <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#81c784", fontFamily: "Paris2024", fontSize: "200%" }}>
                Sign Up
              </h2>

              <form onSubmit={handleSubmit}>
                <MDBRow className="mb-4">
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-2"
                      label="Username"
                      id="form1"
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      style={{ borderRadius: "5px", border: "1px dashed #111111", backgroundColor: "rgba(50,50,50,0.5)" }}
                      inputStyle={{ fontSize: "1rem", padding: "10px", backgroundColor: "rgba(50,50,50,0.2)", color: "white" }}
                      labelStyle={{ color: "white" }}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form3"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ borderRadius: "5px", border: "1px dashed #111111", backgroundColor: "rgba(50,50,50,0.5)" }}
                  inputStyle={{ fontSize: "1rem", padding: "10px", backgroundColor: "rgba(50,50,50,0.2)", color: "white" }}
                  labelStyle={{ color: "white" }}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ borderRadius: "5px", border: "1px dashed #111111", backgroundColor: "rgba(50,50,50,0.5)" }}
                  inputStyle={{ fontSize: "1rem", padding: "10px", backgroundColor: "rgba(50,50,50,0.2)", color: "white" }}
                  labelStyle={{ color: "white" }}
                />

                <MDBBtn
                  className="w-100 mb-4"
                  size="md"
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: "#81c784",
                    borderRadius: "5px",
                    color: "#323232",
                    fontWeight: "bold",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  {loading ? "Registering..." : "Sign Up"}
                </MDBBtn>

                <div className="text-center">
                  <p style={{ color: "white", fontFamily: "CWCReg" }}>
                    Already have an account?
                    <a href="/login" style={{ color: "#81c784", textDecoration: "none", fontWeight: "bold" }}>
                      {" "}Login
                    </a>
                  </p>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {/* Error Snackbar */}
      <Snackbar
        open={errorSnackbar.open}
        autoHideDuration={4000}
        onClose={() => setErrorSnackbar({ ...errorSnackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">{errorSnackbar.message}</Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={successSnackbar.open}
        autoHideDuration={4000}
        onClose={() => setSuccessSnackbar({ ...successSnackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success">{successSnackbar.message}</Alert>
      </Snackbar>
    </MDBContainer>
  );
}

export default Register;
