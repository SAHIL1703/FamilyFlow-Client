import React from "react";

const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
      {/* --- CARD 1 --- */}
      <div className="group border border-blue-50 bg-white shadow-xl shadow-blue-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-blue-100 rounded-lg mb-6 group-hover:bg-blue-200 transition-colors">
          <i className="text-3xl text-blue-600 fa-solid fa-house-chimney-window"></i>
        </span>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">Family Rooms</h3>
        <p className="text-gray-500 leading-relaxed">
          Create private spaces for your family. Invite members with a simple
          link.
        </p>
      </div>

      {/* --- CARD 2 --- */}
      <div className="group border border-amber-50 bg-white shadow-xl shadow-amber-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-amber-100 rounded-lg mb-6 group-hover:bg-amber-200 transition-colors">
          <i className="text-3xl text-amber-600 fa-regular fa-comment-dots"></i>
        </span>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Real-time Chat
        </h3>
        <p className="text-gray-500 leading-relaxed">
          Instant messaging keeps everyone in the loop, no matter where they
          are.
        </p>
      </div>

      {/* --- CARD 3 --- */}
      <div className="group border border-blue-50 bg-white shadow-xl shadow-blue-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-blue-100 rounded-lg mb-6 group-hover:bg-blue-200 transition-colors">
          <i className="text-3xl text-blue-600 fa-solid fa-location-arrow"></i>
        </span>

        <h3 className="text-2xl font-bold text-gray-800 mb-2">Live Location</h3>
        <p className="text-gray-500 leading-relaxed">
          See your family's location on the map in real-time for peace of mind.
        </p>
      </div>
    </div>
  );
};

export default Card;
