import React, { useEffect, useContext, useRef } from "react";
import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

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
  
  // Ref to hold latest GPS data (avoids stale closures)
  const locationRef = useRef({ lat: null, lng: null });

  // 3. SETUP SOCKET & TRACKING
  useEffect(() => {
    // Only run if user is logged in
    if (!user?._id) return;

    // A. Connect & Identify User
    if (!socket.connected) socket.connect();
    socket.emit("setup_socket", user._id);
    console.log("🔌 Socket Setup Emitted for:", user.username);

    let watcherId = null;

    const startTracking = async () => {
      try {
        // === 1. PERMISSIONS CHECK ===
        // This works for both Mobile and Web
        const permissionStatus = await Geolocation.checkPermissions();
        
        if (permissionStatus.location !== 'granted') {
           const requestStatus = await Geolocation.requestPermissions();
           if (requestStatus.location !== 'granted') {
             console.warn("Location permission denied");
             return;
           }
        }

        // === 2. START WATCHER ===
        // Geolocation.watchPosition works on both Web and Native (Android/iOS)
        watcherId = await Geolocation.watchPosition(
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
          (position, err) => {
            if (err) {
              console.error("GPS Error:", err);
              return;
            }

            if (position) {
               const { latitude, longitude } = position.coords;

               // Update Ref
               locationRef.current = { lat: latitude, lng: longitude };

               // Update Context (for UI)
               if (setUserLocation) {
                 setUserLocation([latitude, longitude]);
               }

               // SEND TO SOCKET
               // Note: On Native, we send directly here to ensure updates happen
               // even if the standard JS loop is paused.
               console.log("📍 Location Update:", latitude, longitude);
               socket.emit("send_location", {
                  userId: user._id,
                  latitude: latitude,
                  longitude: longitude,
               });
            }
          }
        );

      } catch (e) {
        console.error("Tracking Error:", e);
      }
    };

    startTracking();

    // === 3. WEB BACKUP INTERVAL ===
    // If we are on the WEB (not native), browsers sometimes sleep the watcher.
    // This interval acts as a backup to keep the connection alive if the tab is open.
    let webInterval = null;
    if (!Capacitor.isNativePlatform()) {
        webInterval = setInterval(() => {
            const { lat, lng } = locationRef.current;
            if (lat && lng) {
                 // Redundant emit for safety on web
                 // socket.emit("send_location", ... ) is handled in watcher, 
                 // but you can uncomment this if web updates feel laggy.
            }
        }, 5000);
    }

    // Cleanup on logout/unmount
    return () => {
      console.log("🛑 Cleaning up Tracking");
      if (watcherId) Geolocation.clearWatch({ id: watcherId });
      if (webInterval) clearInterval(webInterval);
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