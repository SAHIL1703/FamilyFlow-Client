// import { createContext, useEffect, useState } from "react";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   // ✅ Initialize state directly from localStorage to prevent "null" on refresh
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if we have a token but maybe the user state was lost
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setUser(null);
//     }
//     setLoading(false);
//   }, []);

//   // ✅ Login
//   const login = (userData, token) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   // ✅ Logout
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         setUser,
//         login,
//         logout,
//         isAuthenticated: !!user,
//         loading,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };


import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // LOAD USER ON APP START
  // ==========================
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
        "http://localhost:3000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  // ==========================
  // LOGIN (🔥 FIXED)
  // ==========================
  const login = async (token) => {
    localStorage.setItem("token", token);
    await loadUser(); // 👈 THIS WAS MISSING
  };

  // ==========================
  // LOGOUT
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

