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
import "./login.css";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useAuth } from "../../services/authContext";
import axios from "axios";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email || !formData.password) {
      setError({ message: "All fields are required", severity: "warning" });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4200/auth/login", formData);

      // Call `login` function from AuthContext
      login(response.data.user, response.data.token);

      navigate("/dashboard", { replace: true });

    } catch (error) {
      setError({
        message: error.response?.data?.message || "Login failed",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden background-container2">
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setError(null)} severity={error?.severity} sx={{ width: "100%" }}>
          {error?.message}
        </Alert>
      </Snackbar>

      <MDBRow>
        <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: "hsl(218, 81%, 95%)", fontFamily: "Paris2024" }}>
            Sow the seeds <br />
            <span style={{ color: "#cba249" }}>for your success</span>
          </h1>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <MDBCard className="my-5 glass-effect" style={{
            background: "rgba(50, 50, 50, 0.25)",
            borderRadius: "15px",
            boxShadow: "0 8px 32px 0 rgba(6, 6, 13, 0.37)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}>
            <MDBCardBody className="p-5 mt-5" style={{ borderRadius: "10px", color: "white" }}>
              <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#81c784", fontFamily: "Paris2024", fontSize: "200%" }}>
                Log In
              </h2>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ borderRadius: "5px", border: "1px dashed #111111", backgroundColor: "rgba(50,50,50,0.5)" }}
                  inputStyle={{ fontSize: "1rem", padding: "10px", backgroundColor: "rgba(50,50,50,0.2)", color: "white" }}
                  labelStyle={{ color: "white" }}
                />

                <div style={{ position: "relative" }}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{ borderRadius: "5px", border: "1px dashed #111111", backgroundColor: "rgba(50,50,50,0.5)" }}
                    inputStyle={{ fontSize: "1rem", padding: "10px", backgroundColor: "rgba(50,50,50,0.2)", color: "white" }}
                    labelStyle={{ color: "white" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "white", cursor: "pointer" }}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

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
                  {loading ? "Logging in..." : "Log In"}
                </MDBBtn>

                <div className="text-center">
                  <p style={{ color: "white", fontFamily: "CWCReg" }}>
                    Don't have an account?
                    <a href="/register" style={{ color: "#81c784", textDecoration: "none", fontWeight: "bold" }}> Sign Up!</a>
                  </p>
                  <p style={{ color: "white", fontFamily: "CWCReg" }}>
                    Continue without Signing in
                    <a href="/ua/home" style={{ color: "#81c784", textDecoration: "none", fontWeight: "bold" }}> click here</a>
                  </p>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
