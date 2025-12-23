import React, { useEffect, useContext, useRef } from "react";
import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

// IMPORT SHARED SOCKET
import { socket } from "./socket"; 

// Context & Pages
import { AppContext } from "./context/AppContext";
import LandingPage from "./Pages/LandingPage";
import DashboardPage from "./Pages/DashboardPage";
import RoomPage from "./Pages/RoomPage";
import InvitationsPage from "./Pages/InvitationsPage";
import MapPage from "./Pages/MapPage";
import ChatPage from "./Pages/ChatPage";
import LoginPage from "./Pages/LoginPage";
import FeaturePage from "./Pages/FeaturePage";
import AboutPage from "./Pages/AboutPage";
import TeamPage from "./Pages/TeamPage";

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
  
  // Ref to hold latest GPS data (avoids stale closures in setInterval)
  const locationRef = useRef({ lat: null, lng: null });

  // 3. SETUP SOCKET & TRACKING
  useEffect(() => {
    // Only run if user is logged in
    if (!user?._id) return;

    // A. Connect & Identify User
    if (!socket.connected) socket.connect();
    socket.emit("setup_socket", user._id);
    console.log("🔌 Socket Setup Emitted for:", user.username);

    // B. Start GPS Watcher
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Update Ref for the Interval
        locationRef.current = { lat: latitude, lng: longitude };
        
        // Update Global Context (for immediate UI use)
        if (setUserLocation) {
          setUserLocation([latitude, longitude]);
        }
      },
      (err) => {
        console.warn(`GPS Warning (${err.code}): ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0, // Force fresh data
      }
    );

    // C. Interval: Send Location every 5 Seconds
    const intervalId = setInterval(() => {
        const { lat, lng } = locationRef.current;
        
        if (lat && lng) {
            // console.log("📍 Sending 5s Update:", lat, lng);
            socket.emit("send_location", {
                userId: user._id,
                latitude: lat,
                longitude: lng,
            });
        }
    }, 5000);

    // Cleanup on logout/unmount
    return () => {
      console.log("🛑 Cleaning up App effects");
      navigator.geolocation.clearWatch(watchId);
      clearInterval(intervalId);
    };
  }, [user?._id, setUserLocation]);

  return (
    <div className="app-container">
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        {/* === PUBLIC ROUTES === */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/features" element={<FeaturePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />

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