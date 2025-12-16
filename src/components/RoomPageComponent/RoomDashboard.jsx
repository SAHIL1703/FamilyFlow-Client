import React from "react";
import { 
  Users, 
  MoreVertical, 
  ArrowRight, 
  MessageSquare, 
  Plus, 
  Crown, 
  Globe 
} from "lucide-react";

const RoomDashboard = ({ rooms, currentUserId, onCreateClick }) => {

  // --- Helper: Date Formatter ---
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // --- 1. Empty State Handling ---
  if (!rooms || rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <Globe className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">No rooms found</h2>
        <p className="text-gray-500 max-w-sm mt-2 mb-6">
          You haven't joined any rooms yet. Create your first space to get started.
        </p>
        <button 
          onClick={onCreateClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all"
        >
          Create New Room
        </button>
      </div>
    );
  }

  // --- 2. Sort Rooms (Newest First) ---
  const sortedRooms = [...rooms].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recentRoom = sortedRooms[0];
  const previousRooms = sortedRooms.slice(1);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              You are part of <span className="font-semibold text-gray-900">{rooms.length} active spaces</span>
            </p>
          </div>
          <button 
            onClick={onCreateClick}
            className="group flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl font-medium hover:bg-black transition-all shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> 
            <span>Create Room</span>
          </button>
        </div>

        {/* --- HERO CARD: Most Recent Room --- */}
        {recentRoom && (
          <div className="relative w-full bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden group cursor-pointer hover:border-blue-200 transition-all">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-40 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-blue-100/50 transition-colors"></div>
            
            <div className="relative z-10 p-6 md:p-10 flex flex-col lg:flex-row gap-8 justify-between">
              
              {/* Left Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-600/20">
                    {recentRoom.roomName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                      {recentRoom.roomName}
                    </h2>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full">
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                        Admin
                      </span>
                      <span>• Created {formatDate(recentRoom.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                  {recentRoom.description || <span className="italic text-gray-400">No description provided for this room.</span>}
                </p>

                {/* Stats Chips */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2 text-gray-700 font-medium">
                    <Users className="w-4 h-4 text-blue-500" />
                    {recentRoom.members?.length || 0} Members
                  </div>
                  <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2 text-gray-700 font-medium">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    {recentRoom.chats?.length || 0} Messages
                  </div>
                  
                  {/* "Live" Indicator based on 'presentUsers' */}
                  {(recentRoom.presentUsers?.length > 0) && (
                    <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 font-bold animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      {recentRoom.presentUsers.length} Online Now
                    </div>
                  )}
                </div>
              </div>

              {/* Right Action */}
              <div className="flex items-end lg:justify-end">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20">
                  Enter Room <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- GRID: Previous Rooms --- */}
        {previousRooms.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                Previous Rooms
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousRooms.map((room) => {
                 // Check if current user is the creator
                 const isAdmin = room.createdBy === currentUserId || room.createdBy?._id === currentUserId;

                 return (
                  <div 
                    key={room._id} 
                    className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center text-xl font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {room.roomName.charAt(0).toUpperCase()}
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mb-4 flex-grow">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                        {room.roomName}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {room.description || "No description provided."}
                      </p>
                    </div>

                    {/* Footer Info */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" /> {room.members?.length || 0}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4" /> {room.chats?.length || 0}
                        </span>
                      </div>
                      
                      {isAdmin && (
                        <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100 uppercase">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                 );
              })}

              {/* "Create New" Card Placeholder */}
              <button 
                onClick={onCreateClick}
                className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/30 transition-all min-h-[220px]"
              >
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-semibold">Create another room</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDashboard;