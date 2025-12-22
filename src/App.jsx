import React, { useEffect, useContext } from "react";
import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { io } from "socket.io-client";

// Context & Pages
import { AppContext } from "./context/AppContext"; // Ensure this path is correct
import LandingPage from "./Pages/LandingPage";
import DashboardPage from "./Pages/DashboardPage";
import RoomPage from "./Pages/RoomPage";
import InvitationsPage from "./Pages/InvitationsPage";
import MapPage from "./Pages/MapPage";
import ChatPage from "./Pages/ChatPage";
import LoginPage from "./Pages/LoginPage";

// Initialize Socket.io (Connects once when the app starts)
const socket = io("http://localhost:3000");

// 1. AUTH LOGIC
const useAuth = () => {
  const token = localStorage.getItem("token");
  return (token && token !== "undefined" && token !== "null");
};

// 2. PROTECTED ROUTE WRAPPER
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
};

const App = () => {
  const { user, setUserLocation } = useContext(AppContext);

  // 3. GLOBAL REAL-TIME TRACKING
  useEffect(() => {
    // Only start tracking if a user is logged in
    if (!user?._id) return;

    console.log("🛰️ Global tracking active for:", user.username);

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // A. Update Global Context (so the Map can access your live pos)
        if (setUserLocation) {
          setUserLocation([latitude, longitude]);
        }

        // B. Send to Server (Server broadcasts to all user's rooms)
        socket.emit("send_location", {
          userId: user._id,
          latitude,
          longitude,
        });
      },
      (err) => {
        console.warn(`GPS Warning (${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000, // 30 seconds to lock onto satellite
        maximumAge: 10000, // Use location if it's less than 10s old
      }
    );

    // Cleanup when user logs out or app closes
    return () => {
      console.log("🛑 Global tracking stopped");
      navigator.geolocation.clearWatch(watchId);
    };
  }, [user?._id, setUserLocation]);

  return (
    <div className="app-container">
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* === PUBLIC ROUTES === */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginPage />} />

        {/* === PRIVATE ROUTES === */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/app-dashboard" element={<DashboardPage />} />
          <Route path="/app-room" element={<RoomPage />} />
          <Route path="/app-invite" element={<InvitationsPage />} />
          <Route path="/app-map" element={<MapPage />} />
          <Route path="/app-chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;