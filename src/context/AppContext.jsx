
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 📍 NEW: Global Location State
  const [userLocation, setUserLocation] = useState(null); // Stores [lat, lng]

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
        setUserLocation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};