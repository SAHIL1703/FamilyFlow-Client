
import { createContext, useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 📍 NEW: Global Location State
  const [userLocation, setUserLocation] = useState(null); // Stores [lat, lng]

  // 🚨 Global Alert State — survives navigation between pages
  const [alertedUsers, setAlertedUsers] = useState(new Set());
  const alertTimersRef = useRef({}); // Track auto-clear timers per userId

  const addAlertedUser = useCallback((userId) => {
    if (!userId) return;
    const id = String(userId);

    setAlertedUsers((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    // Clear any existing timer for this user, then set a new 60s auto-clear
    if (alertTimersRef.current[id]) clearTimeout(alertTimersRef.current[id]);
    alertTimersRef.current[id] = setTimeout(() => {
      setAlertedUsers((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      delete alertTimersRef.current[id];
    }, 60000);
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        "https://familyflow-kun4.onrender.com/api/auth/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(data.user);
    } catch (error) {
      console.error("Auth failed", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    await loadUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserLocation(null); // Clear location on logout
    setAlertedUsers(new Set()); // Clear alerts on logout
    Object.values(alertTimersRef.current).forEach(clearTimeout);
    alertTimersRef.current = {};
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        // 📍 NEW: Export location helpers
        userLocation,
        setUserLocation,
        // 🚨 Alert helpers
        alertedUsers,
        addAlertedUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};