import axios from "axios";
import React, { useEffect, useState } from "react";

const Invitations = () => {
  const [invites, setInvites] = useState([]);

  // ======================
  // FETCH INVITATIONS
  // ======================
  const getInvitations = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get("https://familyflow-kun4.onrender.com/api/invites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        const formattedInvites = data.invitations
          .filter((invite) => invite.status === "pending") // ✅ ONLY PENDING
          .map((invite) => ({
            id: invite._id,
            sender: invite.senderId.username,
            roomName: invite.roomId.roomName,
            time: new Date(invite.createdAt).toLocaleString(),
            avatar: invite.senderId.username
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase(),
          }));

        setInvites(formattedInvites);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // ======================
  // ACCEPT INVITE
  // ======================
  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `https://familyflow-kun4.onrender.com/api/invites/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvites((prev) => prev.filter((invite) => invite.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  // ======================
  // REJECT INVITE
  // ======================
  const handleDecline = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `https://familyflow-kun4.onrender.com/api/invites/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvites((prev) => prev.filter((invite) => invite.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  // ✅ FIX: Call API once
  useEffect(() => {
    getInvitations();
  }, []);

  if (invites.length === 0) return null;

  // ⛔ UI NOT TOUCHED ⛔
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

      {/* Content Area */}
      <div className="p-2 overflow-y-auto custom-scrollbar">
        <div className="space-y-3">
          {invites.map((invite) => (
            <div
              key={invite.id}
              className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs md:text-sm border border-indigo-50 flex-shrink-0">
                    {invite.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                      {invite.sender}
                    </h4>
                    <p className="text-[10px] md:text-xs text-gray-500 leading-tight">
                      invited you to{" "}
                      <span className="text-indigo-600 font-medium">
                        {invite.roomName}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-1">
                  {invite.time}
                </span>
              </div>

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
