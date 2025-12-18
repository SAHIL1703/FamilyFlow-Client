import React from "react";
import {useNavigate} from "react-router-dom"
const GoCards = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto my-8 p-4">
      {/* Grid Layout: 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Create Room Card (Blue) */}
        <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 group cursor-pointer transition-all duration-300 flex flex-col justify-between h-72 w-full">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
            <i className="text-blue-500 text-2xl fa-solid fa-plus group-hover:text-white transition-colors duration-300"></i>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <h2 className="font-bold text-2xl text-gray-800 group-hover:text-blue-600 transition-colors">
              Create Room
            </h2>
            <p className="text-gray-500 mt-2 leading-relaxed text-sm">
              Start a new family room for communication.
            </p>
          </div>
          <button onClick={()=>navigate('/app-room')} className="w-full py-3 rounded-lg bg-gray-50 text-gray-600 font-medium group-hover:bg-blue-600 group-hover:text-white flex justify-center items-center gap-2 transition-all duration-300">
            Create
            <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>

        {/* 2. Invite Members Card (Green) */}
        <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-green-500 hover:shadow-xl hover:-translate-y-1 group cursor-pointer transition-all duration-300 flex flex-col justify-between h-72 w-full">
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
            <i className="text-green-500 text-2xl fa-solid fa-user-plus group-hover:text-white transition-colors duration-300"></i>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <h2 className="font-bold text-2xl text-gray-800 group-hover:text-green-600 transition-colors">
              Invite Members
            </h2>
            <p className="text-gray-500 mt-2 leading-relaxed text-sm">
              Add family members to your circle.
            </p>
          </div>
          <button onClick={()=> navigate('/app-invite')} className="w-full py-3 rounded-lg bg-gray-50 text-gray-600 font-medium group-hover:bg-green-600 group-hover:text-white flex justify-center items-center gap-2 transition-all duration-300">
            Invite
            <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>

        {/* 3. Chats Card (Orange) */}
        <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-500 hover:shadow-xl hover:-translate-y-1 group cursor-pointer transition-all duration-300 flex flex-col justify-between h-72 w-full">
          <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
            <i className="text-orange-500 text-2xl fa-solid fa-comments group-hover:text-white transition-colors duration-300"></i>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <h2 className="font-bold text-2xl text-gray-800 group-hover:text-orange-600 transition-colors">
              Group Chats
            </h2>
            <p className="text-gray-500 mt-2 leading-relaxed text-sm">
              Stay connected with group messages.
            </p>
          </div>
          <button  onClick={()=> navigate('/app-chat')} className="w-full py-3 rounded-lg bg-gray-50 text-gray-600 font-medium group-hover:bg-orange-600 group-hover:text-white flex justify-center items-center gap-2 transition-all duration-300">
            Chat Now
            <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>

        {/* 4. Family Map Card (Purple) */}
        <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-purple-500 hover:shadow-xl hover:-translate-y-1 group cursor-pointer transition-all duration-300 flex flex-col justify-between h-72 w-full">
          <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
            <i className="text-purple-500 text-2xl fa-solid fa-map-location-dot group-hover:text-white transition-colors duration-300"></i>
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <h2 className="font-bold text-2xl text-gray-800 group-hover:text-purple-600 transition-colors">
              Family Map
            </h2>
            <p className="text-gray-500 mt-2 leading-relaxed text-sm">
              Track the live location of members.
            </p>
          </div>
          <button onClick={()=>navigate('/app-map')} className="w-full py-3 rounded-lg bg-gray-50 text-gray-600 font-medium group-hover:bg-purple-600 group-hover:text-white flex justify-center items-center gap-2 transition-all duration-300">
            View Map
            <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoCards;
