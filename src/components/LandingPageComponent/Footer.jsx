import React from "react";

const Footer = () => {
  return (
    <div className="mt-10 bg-blue-950 text-white py-12">
      
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        {/* === SESSION 1: BRANDING === */}
        <div className="flex flex-col gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <img
              className="h-10 w-10 object-contain rounded-full bg-white p-0.5" // Added white bg to logo img just in case transparency is weird
              src="familyflow_logo_tree.jpg"
              alt="Logo"
            />
            {/* Changed text-gray-800 to text-white so it shows on dark background */}
            <h1 className="text-2xl font-bold tracking-wide text-white">
              Family<span className="text-amber-500">Flow</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed">
            Keep your family connected and safe with real-time location sharing
            and instant messaging.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 mt-2">
            {/* Facebook */}
            <div className="bg-gray-700 hover:bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer">
              <i className="text-white fa-brands fa-facebook-f"></i>
            </div>
            {/* Twitter/X */}
            <div className="bg-gray-700 hover:bg-sky-500 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer">
              <i className="text-white fa-brands fa-twitter"></i>
            </div>
            {/* Instagram */}
            <div className="bg-gray-700 hover:bg-pink-600 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer">
              <i className="text-white fa-brands fa-instagram"></i>
            </div>
          </div>
        </div>

        {/* === SESSION 2: PRODUCT === */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-amber-500">Product</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Features</li>
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Pricing</li>
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Download</li>
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Integrations</li>
          </ul>
        </div>

        {/* === SESSION 3: COMPANY === */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-amber-500">Company</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">About</li>
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Blogs</li>
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Careers</li>
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Press</li>
          </ul>
        </div>

        {/* === SESSION 4: SUPPORT === */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-amber-500">Support</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Help Center</li>
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Contact Us</li>
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white hover:translate-x-1 transition-transform cursor-pointer">Terms Of Service</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Footer;