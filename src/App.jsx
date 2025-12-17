import React from "react";
// 1. IMPORT Navigate and Outlet
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import DashboardPage from "./Pages/DashboardPage";
import RoomPage from "./Pages/RoomPage";
import Navbar from "./components/NavbarComponent/Navbar"; // Assuming you want this visible
import InvitationsPage from "./Pages/InvitationsPage";
import MapPage from "./Pages/MapPage";
import ChatPage from "./Pages/ChatPage";
import LoginPage from "./Pages/LoginPage";

// 2. AUTH LOGIC
const useAuth = () => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined" || token === "null") {
    return false;
  }

  return true;
};


// 3. PROTECTED ROUTE WRAPPER (The Layout Pattern)
// This checks auth. If logged in, it renders the child route (<Outlet />).
// If not, it kicks them back to "/auth"
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
};

const App = () => {
  return (
    <Routes>
      {/* === PUBLIC ROUTES (No Login Required) === */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<LoginPage />} />

      {/* === PRIVATE ROUTES (Login Required) === */}
      {/* Any route nested inside here is automatically protected */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/app-dashboard" element={<DashboardPage />} />
        <Route path="/app-room" element={<RoomPage />} />
        <Route path="/app-invite" element={<InvitationsPage />} />
        <Route path="/app-map" element={<MapPage />} />
        <Route path="/app-chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default App;