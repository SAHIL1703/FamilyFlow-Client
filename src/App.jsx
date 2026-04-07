import React, { useEffect, useContext, useRef } from "react";
import { Toaster, toast } from 'react-hot-toast'; // 👈 Added toast import
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
import LinkDevicePage from "./Pages/LinkDevicePage"; // 👈 NEW IMPORT

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
  
  // Ref to hold latest GPS data
  const locationRef = useRef({ lat: null, lng: null });

  // 3. SETUP SOCKET & TRACKING
  useEffect(() => {
    if (!user?._id) return;

    if (!socket.connected) socket.connect();
    socket.emit("setup_socket", user._id);
    console.log("🔌 Socket Setup Emitted for:", user.username);

    // 👇 NEW: LISTEN FOR SCREAM ALERTS FROM BACKEND
    socket.on("emergency_alert", (data) => {
      console.error("🚨 EMERGENCY RECEIVED:", data);
      
      // Show a massive toast notification that doesn't disappear easily
      toast.error(`🚨 ${data.message}`, {
        duration: 10000, // Stays on screen for 10 seconds
        style: {
          border: '2px solid red',
          padding: '16px',
          color: 'red',
          fontWeight: 'bold',
          fontSize: '18px'
        },
      });

      // Optional: If on mobile, vibrate the phone!
      // if (Capacitor.isNativePlatform()) {
      //   import('@capacitor/haptics').then(({ Haptics }) => Haptics.vibrate());
      // }
    });

    let watcherId = null;

    const startTracking = async () => {
      try {
        const permissionStatus = await Geolocation.checkPermissions();
        
        if (permissionStatus.location !== 'granted') {
           const requestStatus = await Geolocation.requestPermissions();
           if (requestStatus.location !== 'granted') {
             console.warn("Location permission denied");
             return;
           }
        }

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
               locationRef.current = { lat: latitude, lng: longitude };

               if (setUserLocation) {
                 setUserLocation([latitude, longitude]);
               }

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

    let webInterval = null;
    if (!Capacitor.isNativePlatform()) {
        webInterval = setInterval(() => {
            const { lat, lng } = locationRef.current;
            // Web backup interval logic
        }, 5000);
    }

    return () => {
      console.log("🛑 Cleaning up Tracking");
      if (watcherId) Geolocation.clearWatch({ id: watcherId });
      if (webInterval) clearInterval(webInterval);
      
      // 👇 Clean up the socket listener so it doesn't duplicate
      socket.off("emergency_alert"); 
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
          
          {/* 👇 NEW DEVICE LINKING ROUTE */}
          <Route path="/app-device" element={<LinkDevicePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;