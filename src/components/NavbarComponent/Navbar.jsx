import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { LogOut, User, Menu, X } from "lucide-react"; // Using Lucide for cleaner icons (or keep FontAwesome)
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext); // Get dynamic user data
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // 1. LOGOUT LOGIC
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear context
    setIsMobileMenuOpen(false);
    navigate("/auth"); // Redirect to login
  };

  // 2. DEFINE LINKS (Public vs Private)
  const guestLinks = [
    { name: "Home", path: "/", className: "fa-solid fa-house" },
    { name: "Login", path: "/auth", className: "fa-solid fa-right-to-bracket" },
  ];

  const authLinks = [
    { name: "Dashboard", path: "/app-dashboard", className: "fa-solid fa-chart-line" },
    { name: "Room", path: "/app-room", className: "fa-solid fa-people-roof" },
    { name: "Invite", path: "/app-invite", className: "fa-solid fa-envelope-open-text" },
    { name: "Map", path: "/app-map", className: "fa-solid fa-map-location-dot" },
    { name: "Chats", path: "/app-chat", className: "fa-solid fa-comments" },
  ];

  // Choose which links to display based on Auth status
  const navItems = user ? authLinks : guestLinks;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm transition-all duration-300">
      
      {/* Main Container */}
      <div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
        
        {/* 1. LEFT: Logo */}
        <Link to="/" className="inline-flex items-center gap-2 sm:gap-3 group">
          <img
            className="w-10 h-10 sm:h-11 sm:w-11 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
            src="/familyflow_logo_tree.jpg" // Ensure path is correct in public folder
            alt="FamilyFlow Logo"
          />
          <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
            Family <span className="text-amber-600">Flow</span>
          </h1>
        </Link>

        {/* 2. CENTER: Desktop Navbar Links */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`
                      px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold transition-all duration-200
                      ${
                        isActive
                          ? "bg-amber-100/50 text-amber-700 shadow-sm ring-1 ring-amber-200"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }
                    `}
                  >
                    <i className={`${item.className}`}></i>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 3. RIGHT: User Profile / Auth Buttons */}
        <div className="flex items-center gap-3">
          
          {user ? (
            // --- LOGGED IN VIEW ---
            <div className="relative hidden md:block">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-sm font-semibold text-slate-700 ml-2">
                  {user.username || "User"}
                </span>
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 border border-amber-200">
                   {/* Show Initials or generic icon */}
                   <i className="fa-solid fa-user"></i>
                </div>
              </button>

              {/* Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
             // --- GUEST VIEW (Desktop) ---
             <div className="hidden md:flex gap-2">
                <Link to="/auth" className="px-5 py-2 rounded-full text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md">
                    Get Started
                </Link>
             </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* 4. MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl animate-in fade-in slide-in-from-top-5 z-40">
          <ul className="flex flex-col p-4 gap-2">
            
            {/* User Info Header (Mobile) */}
            {user && (
                <div className="flex items-center gap-3 p-3 mb-2 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-800">{user.username}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                </div>
            )}

            {/* Navigation Links */}
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                       px-4 py-3 rounded-xl flex items-center gap-3 font-medium transition-all
                       ${isActive 
                         ? "bg-slate-100 text-amber-600 border border-slate-200" 
                         : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                       }
                    `}
                  >
                    <i className={`${item.className} w-6 text-center text-lg`}></i>
                    {item.name}
                  </Link>
                </li>
              );
            })}

            {/* Mobile Logout / Login */}
            <li className="mt-2 pt-2 border-t border-slate-100">
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 rounded-xl flex items-center gap-3 font-medium text-red-600 hover:bg-red-50 transition-all"
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket w-6 text-center text-lg"></i>
                        Sign Out
                    </button>
                ) : (
                    <Link
                        to="/auth"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full px-4 py-3 rounded-xl flex items-center gap-3 font-medium text-slate-800 hover:bg-slate-50 transition-all"
                    >
                        <i className="fa-solid fa-right-to-bracket w-6 text-center text-lg"></i>
                        Log In
                    </Link>
                )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;