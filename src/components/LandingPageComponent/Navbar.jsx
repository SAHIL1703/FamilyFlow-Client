import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
  ];

  const [menu, setMenu] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="flex items-center justify-between py-4 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer select-none">
          <img
            className="h-10 w-10 object-cover rounded-full border border-slate-200"
            src="/familyflow_logo_tree.jpg" // Ensure this is in your public folder
            alt="FamilyFlow"
          />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800">
            Family<span className="text-amber-500">Flow</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-8 text-slate-600 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="hover:text-amber-500 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/auth" className="px-5 py-2 font-semibold text-slate-600 hover:text-amber-600 transition-colors">
            Sign In
          </Link>
          <Link to="/auth" className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 shadow-lg shadow-amber-200 hover:shadow-xl transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMenu(!menu)} className="md:hidden text-slate-700">
          <i className={`fa-solid ${menu ? "fa-xmark" : "fa-bars"} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-4 pb-6 pt-2 shadow-lg">
          <ul className="space-y-4 mb-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMenu(false)}
                  className="block text-lg font-medium text-slate-600 hover:text-amber-500"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link to="/auth" className="w-full py-3 rounded-xl border border-slate-200 text-center font-semibold text-slate-700">
              Sign In
            </Link>
            <Link to="/auth" className="w-full py-3 rounded-xl bg-amber-500 text-white text-center font-semibold shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;