import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import PropertiesListingPage from "./pages/PropertiesListingPage/PropertiesListingPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<h1>I am a Landing Page</h1>} />
        <Route path="/login" element={<h1>I am a Login Page</h1>} />
        <Route path="/signup" element={<h1>I am a Signup Page</h1>} />
        <Route path="/listings" element={<PropertiesListingPage />} />
        <Route
          path="/listings/property/:propertyId"
          element={<PropertyPage />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
