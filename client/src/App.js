import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>I am a Landing Page</h1>} />
        <Route path="/login" element={<h1>I am a Login Page</h1>} />
        <Route path="/signup" element={<h1>I am a Signup Page</h1>} />
        <Route path="/listings" element={<h1>I am a List of Properties</h1>} />
        <Route
          path="/listings/property/:propertyId"
          element={<h1>I a Property</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
