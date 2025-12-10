import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import DashboardPage from "./Pages/DashboardPage";
import RoomPage from "./Pages/RoomPage";

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
        <Route path="/app-dashboard" element={<DashboardPage />} />
        <Route path="app-room" element={<RoomPage />}/>
      </Routes>
    </>
  );
};

export default App;
