import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Feature", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
  ];

  const [menu, setMenu] = useState(false);

  const changeMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="bg-white shadow-sm relative">
      <div className="flex items-center justify-between py-4 px-4 md:px-8 ">
        {/* Logo */}
        <div className="flex items-center gap-1.5 cursor-pointer select-none">
          {" "}
          {/* Reduced gap */}
          <img
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain" /* Smaller image on mobile */
            src="familyflow_logo_tree.jpg"
            alt="Logo"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-gray-800">
            {/* text-lg fits much better on small phones than text-xl */}
            Family<span className="text-amber-500">Flow</span>
          </h1>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-8 text-gray-600 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="cursor-pointer hover:text-amber-500 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons (Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-4">
          <button className="px-4 py-2 font-semibold rounded-2xl hover:bg-blue-200 hover:text-amber-500 transition-all duration-200">
            Sign In
          </button>

          <button className="px-5 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors duration-200 ">
            Get Started
          </button>
        </div>

        {/* Hamburger Icon */}
        <button onClick={changeMenu} className="sm:block md:hidden z-50">
          <span>
            {/* Swapping icons based on state */}
            {menu ? (
              <i className="fa-solid fa-x text-2xl"></i>
            ) : (
              <i className="fa-solid fa-bars text-2xl"></i>
            )}
          </span>
        </button>
      </div>

      {/* ========================================== */}
      {/* ANIMATED DROPDOWN SECTION           */}
      {/* ========================================== */}

      {/* 1. We removed the `{menu ? ...}` conditional render.
         2. We added a wrapper grid div.
         3. We transition grid-rows from 0fr (closed) to 1fr (open).
      */}
      <div
        className={`md:hidden grid overflow-hidden transition-all duration-300 ease-in-out ${
          menu ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          {" "}
          {/* Inner container needed for the grid trick */}
          <div className="border-b-gray-500">
            <ul className="text-gray-600 font-medium px-4 md:px-8 flex flex-col">
              {navItems.map((item) => (
                <li key={item.name} className="py-4">
                  <Link
                    to={item.path}
                    onClick={() => setMenu(false)} // Close menu when link clicked
                    className="cursor-pointer hover:text-amber-500 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col py-4 border-t-gray-500 space-y-3 px-4 md:px-8 pb-6">
            <button className="px-4 py-2 font-semibold rounded-2xl border border-amber-500">
              Sign In
            </button>

            <button className="px-5 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors duration-200 ">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
