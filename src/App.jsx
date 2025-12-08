import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";

//This is For Auth checking
// simple auth check (replace with your auth logic/context)
const isAuthenticated = () => !!localStorage.getItem("token");

// ProtectedRoute component (inline)
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
