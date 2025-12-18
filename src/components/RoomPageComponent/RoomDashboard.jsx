import React from "react";
import { Users, MessageSquare, ArrowRight, ShieldCheck, Plus, Clock } from "lucide-react";

const RoomDashboard = ({ rooms, currentUserId, onCreateClick }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header Alignment: Fixed for Mobile */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">Your Rooms</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Active in <span className="text-blue-600">{rooms.length} workspaces</span>
          </p>
        </div>
        <button 
          onClick={onCreateClick}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
        >
          <Plus className="w-5 h-5" /> Create New Room
        </button>
      </div>

      {/* Grid of Rooms: Balanced spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {rooms.map((room) => (
          <div key={room._id} className="flex flex-col h-full bg-white rounded-[2rem] border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all group">
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:rotate-3 transition-transform">
                {room.roomName.charAt(0)}
              </div>
              {room.createdBy === currentUserId && (
                <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-widest font-black border border-green-100">
                  <ShieldCheck className="w-3 h-3" /> Admin
                </span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{room.roomName}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {room.description || "No description provided for this room."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100/50">
                <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Members</p>
                <div className="flex items-center gap-2 font-bold text-gray-700">
                  <Users className="w-4 h-4 text-blue-500" /> {room.members?.length || 0}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100/50">
                <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Messages</p>
                <div className="flex items-center gap-2 font-bold text-gray-700">
                  <MessageSquare className="w-4 h-4 text-indigo-500" /> {room.chats?.length || 0}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
               <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                  <Clock className="w-3.5 h-3.5" /> {formatDate(room.createdAt)}
               </div>
               <button className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all">
                 Enter <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}

        {/* Responsive Add Button */}
        <button 
          onClick={onCreateClick}
          className="flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all min-h-[300px]"
        >
          <div className="bg-gray-100 p-4 rounded-full mb-4 group-hover:bg-blue-100">
             <Plus className="w-6 h-6" />
          </div>
          <span className="font-bold">Add New Room</span>
        </button>
      </div>
    </div>
  );
};

export default RoomDashboard;