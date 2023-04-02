import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import PropertiesListingPage from "./pages/PropertiesListingPage/PropertiesListingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import "./App.scss";

function App() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState(null);
  const [isAuthValid, setIsAuthValid] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      return setIsAuthValid(false);
    }
    const fetch = async () => {
      try {
        const currentUser = await axios.get(
          `http://localhost:8080/api/users/currentUser`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        const userData = await axios.get(
          `http://localhost:8080/api/users/${currentUser.data.id}`
        );

        /* userData.data = [{ user }, { property if any }] */
        setUser(userData.data[0]);
        if (userData.data.length > 1)
          setProperties(userData.data.slice(1, userData.data.length - 1));
        setIsAuthValid(true);
      } catch (err) {
        console.error(`No user found`);
        setIsAuthValid(false);
      }
    };

    fetch();
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
            element={
              <ProfilePage
                isAuthValid={isAuthValid}
                user={user}
                properties={properties}
              />
            }
          />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
