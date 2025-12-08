import React from "react";

const Cards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-6xl mx-auto">
      {/* --- CARD 1 --- */}
      <div className="group border border-blue-50 bg-white shadow-xl shadow-blue-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-blue-100 rounded-lg mb-6 group-hover:bg-blue-200 transition-colors">
          <i className="text-3xl text-blue-600 fa-solid fa-house-chimney-window"></i>
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Family Rooms
        </h3>
        <p className="text-gray-500 leading-relaxed">
          Create multiple rooms for different family groups - immediate family,
          extended relatives, or close friends.
        </p>
      </div>

      {/* --- CARD 2 --- */}
      <div className="group border border-amber-50 bg-white shadow-xl shadow-amber-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-amber-100 rounded-lg mb-6 group-hover:bg-amber-200 transition-colors">
          <i class="text-3xl text-amber-600 fa-solid fa-plus"></i>
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Easy Invites
        </h3>
        <p className="text-gray-500 leading-relaxed">
          Share a simple invite link to add family members. They accept, and
          they're instantly connected.
        </p>
      </div>

      {/* --- CARD 3 --- */}
      <div className="group border border-blue-50 bg-white shadow-xl shadow-blue-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-blue-100 rounded-lg mb-6 group-hover:bg-blue-200 transition-colors">
          <i class="text-3xl text-blue-60 fa-regular fa-comment"></i>
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Group Chat
        </h3>
        <p className="text-gray-500 leading-relaxed">
          Send messages, photos, and updates instantly. Keep everyone informed
          and connected.
        </p>
      </div>
      {/* --- CARD 4 --- */}
      <div className="group border border-amber-50 bg-white shadow-xl shadow-amber-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-amber-100 rounded-lg mb-6 group-hover:bg-amber-200 transition-colors">
          <i class="text-3xl text-amber-600 fa-solid fa-location-arrow"></i>
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Live Map View
        </h3>
        <p className="text-gray-500 leading-relaxed">
          See all family members on a beautiful map. Know where everyone is at a
          glance.
        </p>
      </div>
      {/* --- CARD 5 --- */}
      <div className="group border border-blue-50 bg-white shadow-xl shadow-blue-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-blue-100 rounded-lg mb-6 group-hover:bg-blue-200 transition-colors">
          <i class="text-3xl text-blue-600 fa-solid fa-triangle-exclamation"></i>
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Smart Alerts
        </h3>
        <p className="text-gray-500 leading-relaxed">
          Get notified when family members arrive or leave important locations.
        </p>
      </div>
      {/* --- CARD 6 --- */}
      <div className="group border border-amber-50 bg-white shadow-xl shadow-amber-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-amber-100 rounded-lg mb-6 group-hover:bg-amber-200 transition-colors">
          <i class="text-3xl text-amber-600 fa-solid fa-shield"></i>
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Private & Secure
        </h3>
        <p className="text-gray-500 leading-relaxed">
          End-to-end encryption ensures your family's data stays private and
          protected.
        </p>
      </div>
      {/* --- CARD 7 --- */}
      <div className="group border border-blue-50 bg-white shadow-xl shadow-blue-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-blue-100 rounded-lg mb-6 group-hover:bg-blue-200 transition-colors">
          <i class="text-3xl text-blue-600 fa-solid fa-mobile-screen-button"></i>
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Works Everywhere
        </h3>
        <p className="text-gray-500 leading-relaxed">
          Access FamilyFlow from any device - phone, tablet, or desktop
          computer.
        </p>
      </div>
      {/* --- CARD 8 --- */}
      <div className="group border border-amber-50 bg-white shadow-xl shadow-amber-100/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <span className="inline-flex justify-center items-center h-16 w-16 bg-amber-100 rounded-lg mb-6 group-hover:bg-amber-200 transition-colors">
          <i class="text-3xl text-amber-600 fa-regular fa-clock"></i>
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Location History
        </h3>
        <p className="text-gray-500 leading-relaxed">
          Review where family members have been throughout the day for added
          peace of mind.
        </p>
      </div>
    </div>
  );
};

export default Cards;
