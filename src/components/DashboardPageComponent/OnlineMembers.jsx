import React from 'react';

const OnlineMembers = ({ members = [] }) => {
  const defaultMembers = [
    { id: 1, name: "Sahil Pisal", status: "online", role: "Admin" },
    { id: 2, name: "Bhavesh", status: "online", role: "Member" },
    { id: 3, name: "Kaushal", status: "offline", role: "Member" },
    { id: 4, name: "Aniket", status: "online", role: "Member" },
    { id: 5, name: "Rohan", status: "offline", role: "Member" },
  ];

  const displayList = members.length > 0 ? members : defaultMembers;

  return (
    // Changed max-w-sm to w-full so it fits the grid column perfectly
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full overflow-hidden h-fit">
      
      {/* --- Header --- */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-gray-800 text-sm md:text-base">
          Active Members
        </h3>
        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
          {displayList.filter(m => m.status === 'online').length} Online
        </span>
      </div>

      {/* --- Scrollable List --- */}
      <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        {displayList.map((member) => (
          <div 
            key={member.id} 
            className="group flex items-center gap-3 p-2 md:p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            
            {/* Avatar */}
            <div className="relative">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs md:text-sm border border-indigo-50">
                {member.name.substring(0, 2).toUpperCase()}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full flex items-center justify-center
                ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}>
                {member.status === 'online' && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors truncate">
                {member.name}
              </h4>
              <p className="text-[10px] md:text-xs text-gray-500 font-medium">
                {member.status === 'online' ? 'Active now' : 'Offline'}
              </p>
            </div>

            {/* Hover Icon */}
            <button className="hidden md:block opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-indigo-600 transition-all transform hover:scale-110">
              <i className="fa-regular fa-comment-dots text-lg"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineMembers;