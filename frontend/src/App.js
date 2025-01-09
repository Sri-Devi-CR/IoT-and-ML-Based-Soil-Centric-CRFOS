import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import CropRecommendationPage from "./pages/CropRecommendationPage";
import ResultPage from "./pages/ResultPage";
import Login from "./pages/Login/login"
import Register from "./pages/Register/register";
import Home from "./pages/home/home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
     
        <Route path="/" element={<LandingPage />} />
        <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
        <Route path="/fertilizer-optimizer" element={<Footer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/crop-recommendation"
          element={<CropRecommendationPage />}
        />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
