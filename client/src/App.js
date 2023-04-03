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
import UserContext from "./UserContext";
import "./App.scss";

function App() {
  const { user, registerUser, registerProperties, properties } =
    useContext(UserContext);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return;
    }

    validateUser(registerUser, registerProperties);
  }, []);

  return (
    <BrowserRouter>
      <Header username={user?.username} />
      <Routes>
        <Route path="/" element={<h1>I am a Landing Page</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/listings" element={<PropertiesListingPage />} />
        <Route
          path="/listings/property/:propertyId"
          element={<PropertyPage />}
        />
        {user && (
          <Route
            path="/profile"
            element={<ProfilePage user={user} properties={properties} />}
          />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
