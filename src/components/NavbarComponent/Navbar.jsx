import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/app-dashboard", className: "fa-regular fa-house" },
    { name: "Room", path: "/app-room", className: "fa-solid fa-user-group" },
    { name: "Member", path: "/member", className: "fa-regular fa-user" },
    { name: "Map", path: "/map", className: "fa-regular fa-map" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm transition-all duration-300">
      {/* Main Container */}
      <div className="flex justify-between items-center px-4 py-2 max-w-7xl mx-auto">
        {/* 1. LEFT: Logo */}
        <div className="inline-flex items-center gap-2 sm:gap-3">
          <img
            className="w-10 h-10 sm:h-12 sm:w-12 rounded-full object-cover border border-white/50"
            src="./familyflow_logo_tree.jpg"
            alt="Logo"
          />
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            Family <span className="text-amber-500">Flow</span>
          </h1>
        </div>

        {/* 2. CENTER: Desktop Navbar Links (Hidden on Mobile) */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`
                      px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-all duration-300
                      ${
                        isActive
                          ? "bg-white/60 text-amber-600 shadow-sm border border-white/40"
                          : "text-gray-700 hover:bg-white/30 hover:text-amber-600 border border-transparent"
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

        {/* 3. RIGHT: User Profile & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop User Button (Hidden on Mobile) */}
          <button className="hidden md:flex w-10 h-10 rounded-full bg-white/30 border border-white/40 shadow-sm items-center justify-center text-gray-700 hover:bg-white/80 hover:text-amber-600 transition-all duration-300">
            <i className="fa-solid fa-user text-lg"></i>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-gray-700 hover:text-amber-600 focus:outline-none transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* Switch icon based on open state (Bars vs X) */}
            <i
              className={`fa-solid ${
                isMobileMenuOpen ? "fa-xmark" : "fa-bars"
              } text-2xl`}
            ></i>
          </button>
        </div>
      </div>

      {/* 4. MOBILE MENU DROPDOWN (Rendered conditionally) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-amber-100 bg-white absolute top-full left-0 w-full shadow-sm flex flex-col animate-in fade-in slide-in-from-top-5 duration-200">
          {/* ^ CHANGED: bg-white/40 -> bg-white/95. This makes it solid enough to hide text behind it. */}

          <ul className="flex flex-col p-4 gap-2">
            {/* Mobile Links */}
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                    className={`
                                    px-4 py-3 rounded-xl flex items-center gap-3 font-medium transition-all
                                    ${
                                      isActive
                                        ? "bg-amber-50 text-amber-600 shadow-sm" // Slightly solid bg for active item
                                        : "text-gray-800 hover:bg-gray-50 hover:text-amber-600"
                                    }
                                `}
                  >
                    <i
                      className={`${item.className} text-xl w-6 text-center`}
                    ></i>
                    {item.name}
                  </Link>
                </li>
              );
            })}

            {/* Mobile User Profile Link */}
            <li className="mt-2 pt-2 border-t border-gray-100">
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl flex items-center gap-3 font-medium text-gray-800 hover:bg-gray-50 hover:text-amber-600 transition-all"
              >
                <i className="fa-solid fa-user text-xl w-6 text-center"></i>
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
