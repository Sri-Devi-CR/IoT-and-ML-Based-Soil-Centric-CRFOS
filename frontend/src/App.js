import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import CropRecommendationPage from "./pages/Crop Recommendation/CropRecommendationPage";
import ResultPage from "./pages/Crop Recommendation/CropResultPage";
import Login from "./pages/Login/login"
import Register from "./pages/Register/register";
import Home from "./pages/home/home";
import FertilizerOptimization from "./pages/Fertilizer Optimization/FertilizerOptimization";
import FertilizerResults from "./pages/Fertilizer Optimization/FertilizerResults";
import ProtectedRoute from "./services/ProtectedRoute";
import DashBoard from "./pages/DashBoard/DashBoard";
import AboutUs from "./pages/About us/About";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
        <Route path="/fertilizer-optimization" element={<FertilizerOptimization />} />
        <Route path="/fertilizer-optimizer" element={<FertilizerOptimization />} />
        <Route path="/results2" element={<FertilizerResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ua/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      <Route path="/results" element={<ResultPage />} />
    </Routes>
      {/* <Footer /> */ }
    </Router >
  );
};

export default App;
