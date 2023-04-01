import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import PropertiesListingPage from "./pages/PropertiesListingPage/PropertiesListingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import "./App.css";
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<h1>I am a Landing Page</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/listings" element={<PropertiesListingPage />} />
        <Route
          path="/listings/property/:propertyId"
          element={<PropertyPage />}
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
