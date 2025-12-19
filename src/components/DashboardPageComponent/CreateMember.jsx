import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const CreateMember = () => {
  const navigate = useNavigate();
  const { user  , loading} = useContext(AppContext);
  const [pendingInviteCount, setPendingInviteCount] = useState(0);
  const [totalMembersCount, setTotalMembersCount] = useState(0);

  // 1. Derived State: These values are calculated directly from the 'user' object.
  // This avoids the "Identifier already declared" error and keeps code clean.

  const activeRoomsCount = user?.roomsJoined?.length  || 0;
  const createdRoomsCount = user?.roomCreated?.length || 0;

  // 2. Handle Redirects and API calls in useEffect
  useEffect(() => {
    if (loading) {
      return;
    }
    if(!user){
      navigate("/auth");
    }

    //Fetch the totalMembersCount
    const fetchTotalMembersCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/rooms/room-count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setTotalMembersCount(res.data.totalMembers);
        }
      } catch (error) {
        console.error(
          "Error fetching Count:",
          error.response?.data?.message || error.message
        );
        toast.error(
          "Error fetching Count:",
          error.response?.data?.message || error.message
        );
      }
    };

    const fetchPendingInvitations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/invites/sent/pending",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setPendingInviteCount(res.data.count);
        }
      } catch (error) {
        console.error(
          "Error fetching invites:",
          error.response?.data?.message || error.message
        );
        toast.error(
          "Error fetching invites:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchTotalMembersCount();
    fetchPendingInvitations();
    
  }, [user,loading,navigate]);

  // If user is null, don't render UI to prevent flashes of empty content
  if (!user) return null;

  return (
    <div>
      {/* Family Info And Create Member */}
      <div className="my-4 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 gap-4">
        <div className="flex flex-col py-2">
          <h1 className="text-3xl font-bold text-gray-800">Family Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage your family rooms and stay connected with loved ones
          </p>
        </div>
        <button
          onClick={() => navigate("/app-room")}
          className="whitespace-nowrap flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Create New Member</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <hr className="border-t border-gray-300 my-4" />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto gap-4 px-4 my-4">
        {/* Total Members */}
        <div className="flex justify-between p-5 bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 font-medium">Total Members</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {totalMembersCount}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <i className="text-blue-500 text-3xl fa-solid fa-user-group"></i>
          </div>
        </div>

        {/* Active Rooms */}
        <div className="flex justify-between p-5 bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 font-medium">Active Rooms</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {activeRoomsCount}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <i className="text-emerald-500 text-3xl fa-solid fa-house"></i>
          </div>
        </div>

        {/* Pending Invitations */}
        <div className="flex justify-between p-5 bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 font-medium leading-tight">
              Pending Invitations
            </p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {pendingInviteCount}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <i className="text-amber-500 text-3xl fa-solid fa-clock-rotate-left"></i>
          </div>
        </div>

        {/* Rooms Created */}
        <div className="flex justify-between p-5 bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 font-medium">Rooms Created</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {createdRoomsCount}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <i className="text-purple-500 text-3xl fa-solid fa-chart-line"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMember;
