import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { validateUser } from "./utils/validateUser";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import PropertiesListingPage from "./pages/PropertiesListingPage/PropertiesListingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserContext from "./contexts/UserContext";
import "./App.scss";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  const currentUserContext = useContext(UserContext);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return;
    }

    if (currentUserContext)
      validateUser(
        currentUserContext.registerUser,
        currentUserContext.registerProperties
      );
  }, []);

  return (
    <BrowserRouter>
      <Header username={currentUserContext?.user?.username} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/listings" element={<PropertiesListingPage />} />
        <Route
          path="/listings/property/:propertyId"
          element={<PropertyPage />}
        />
        {currentUserContext?.user && (
          <Route path="/profile" element={<ProfilePage />} />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
