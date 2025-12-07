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
    console.log(menu)
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
    
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between py-4 px-4 md:px-8 ">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <img
            className="h-10 w-10 md:w-12 md:h-12 object-contain"
            src="familyflow_logo_tree.jpg"
          />
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-gray-800">
            Family<span className="text-amber-500">Flow</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex">
          {/* The <ul> remains the container for the links */}
          <ul className="flex items-center gap-8 text-gray-600 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                {/* Use <Link> for navigation, placing the styling on it */}
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

        {/* Buttons */}
        <div className="hidden md:flex items-center justify-end gap-4">
          <button className="px-4 py-2 font-semibold rounded-2xl hover:bg-blue-200 hover:text-amber-500 transition-all duration-200">
            Sign In
          </button>

          <button className="px-5 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors duration-200 ">
            Get Started
          </button>
        </div>
        <button onClick={()=>changeMenu()} className="sm:block md:hidden">
          <span>
            <i className="fa-solid fa-bars text-2xl"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
