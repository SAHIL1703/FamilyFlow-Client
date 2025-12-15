import React, { useState } from 'react';

const Invitations = () => {
  const [invites, setInvites] = useState([
    { id: 101, sender: "Rohan Das", roomName: "Engineering Boys", time: "2m ago", avatar: "RD" },
    { id: 102, sender: "Priya Sharma", roomName: "Goa Trip 2024", time: "1h ago", avatar: "PS" },
    { id: 103, sender: "Amit Patil", roomName: "Project X", time: "1d ago", avatar: "AP" }
  ]);

  const handleAccept = (id) => {
    console.log(`Accepted invite ${id}`);
    setInvites(invites.filter(invite => invite.id !== id));
  };

  const handleDecline = (id) => {
    console.log(`Declined invite ${id}`);
    setInvites(invites.filter(invite => invite.id !== id));
  };

  if (invites.length === 0) return null; // OPTIONAL: Hide component entirely if no invites?

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full flex flex-col max-h-[350px]">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm md:text-base">
          <i className="fa-regular fa-bell text-indigo-500"></i>
          Invitations
        </h3>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
            {invites.length}
        </span>
      </div>

      {/* Content Area - Scrollable */}
      <div className="p-2 overflow-y-auto custom-scrollbar">
          <div className="space-y-3">
            {invites.map((invite) => (
              <div key={invite.id} className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                
                {/* Top Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs md:text-sm border border-indigo-50 flex-shrink-0">
                      {invite.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{invite.sender}</h4>
                      <p className="text-[10px] md:text-xs text-gray-500 leading-tight">
                        invited you to <span className="text-indigo-600 font-medium">{invite.roomName}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-1">{invite.time}</span>
                </div>

                {/* Bottom Row: Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAccept(invite.id)}
                    className="flex-1 bg-gray-900 text-white text-xs font-semibold py-1.5 md:py-2 rounded-lg hover:bg-gray-800 transition-all"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleDecline(invite.id)}
                    className="flex-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold py-1.5 md:py-2 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                  >
                    Decline
                  </button>
                </div>

              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Invitations;