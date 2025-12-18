import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 1. The Single Card Component
const RoomCard = ({ room }) => {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 flex flex-col justify-between h-full">
      {/* --- Header: Icon & Room Info --- */}
      <div className="flex items-center gap-4 mb-4">
        {/* Icon Container with hover effect */}
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300 flex-shrink-0">
          <i className="fa-solid fa-users text-green-600 text-xl group-hover:text-white transition-colors duration-300"></i>
        </div>

        {/* Room Name & Stats */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 leading-tight">
            {room.roomName}
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{room.members.length} Members</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            {/* Dynamic Online Indicator */}
            <span
              className={`${
                room.activeCount > 0
                  ? "text-green-500 font-medium"
                  : "text-gray-400"
              }`}
            >
              {room.activeCount > 0
                ? `● ${room.activeCount} Online`
                : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* --- Body: Last Chat Preview --- */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 relative overflow-hidden flex-grow">
        {/* Decorative quote mark */}
        <i className="fa-solid fa-quote-left absolute top-2 right-3 text-gray-200 text-4xl -z-0"></i>

        <div className="relative z-10">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Last active: {room.lastSender}
          </p>
          <p className="text-gray-600 text-sm line-clamp-2 italic">
            "{room.lastMessage}"
          </p>
        </div>
      </div>

      {/* --- Footer: Action Buttons --- */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button
          onClick={() => console.log(`Open chat for ${room._id}`)}
          className="flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <i className="fa-regular fa-comment-dots"></i>
          Chat
        </button>

        <button
          onClick={() => console.log(`View map for ${room._id}`)}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <i className="fa-solid fa-map-location-dot text-green-600"></i>
          Map
        </button>
      </div>
    </div>
  );
};

// 2. The Main Container Component
const RoomsActivity = () => {
  const {user} = useContext(AppContext);
  const navigate = useNavigate();
  // Dummy Data with UNIQUE IDs
  const [rooms , setRooms] = useState([]);

  
  useEffect(()=>{
    //Fetch the Rooms
    const fetchRooms =async()=>{
      try{
        const token = localStorage.getItem("token");
        const {data} = await axios.get("http://localhost:3000/api/rooms/my-rooms" , {
          headers : {Authorization : `Bearer ${token}`}
        })
        console.log(data.rooms)
        if(data.success){
          setRooms(data.rooms)
          console.log(rooms)
        }
      }catch(error){
        console.log(error.message)
      }
    }
    fetchRooms();

  } , [user , navigate])

  // const roomsData = [
  //   {
  //     id: 1,
  //     name: "Pisal Family",
  //     totalMembers: 8,
  //     activeCount: 3,
  //     lastSender: "Sahil",
  //     lastMessage: "Hii how are you? Are we meeting today?",
  //   },
  //   {
  //     id: 2,
  //     name: "College Group",
  //     totalMembers: 45,
  //     activeCount: 0,
  //     lastSender: "Aniket",
  //     lastMessage: "Notes send karo koi please.",
  //   },
  //   {
  //     id: 3,
  //     name: "Goa Trip 🌴",
  //     totalMembers: 5,
  //     activeCount: 2,
  //     lastSender: "Bhavesh",
  //     lastMessage: "I have booked the hotels.",
  //   },
  //   {
  //     id: 4,
  //     name: "Office Project",
  //     totalMembers: 12,
  //     activeCount: 5,
  //     lastSender: "Manager",
  //     lastMessage: "Please update the status sheet.",
  //   },
  //   {
  //     id: 5,
  //     name: "Gym Bros",
  //     totalMembers: 4,
  //     activeCount: 1,
  //     lastSender: "Rahul",
  //     lastMessage: "Leg day today?",
  //   },
  //   {
  //     id: 6,
  //     name: "Gaming Squad",
  //     totalMembers: 6,
  //     activeCount: 4,
  //     lastSender: "Sniper",
  //     lastMessage: "Come online fast!",
  //   },
  //   {
  //     id: 7,
  //     name: "React Developers",
  //     totalMembers: 120,
  //     activeCount: 15,
  //     lastSender: "Dev",
  //     lastMessage: "How to fix useEffect loop?",
  //   },
  //   {
  //     id: 8,
  //     name: "Trekking Club",
  //     totalMembers: 20,
  //     activeCount: 0,
  //     lastSender: "Guide",
  //     lastMessage: "Next trip is on Sunday.",
  //   },
  // ];

  const handleClick =()=>{
    console.log("Button Clicked")
    navigate("/app-room")
  }

  return (
    <section className="w-full mx-auto h-full flex flex-col">
      {/* 1. Header (Stays fixed at the top) */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Rooms</h1>
          <p className="text-gray-500 text-sm">
            Manage your chats and live locations
          </p>
        </div>
        <button onClick={handleClick} className="bg-green-50 text-green-600 p-2 rounded-lg hover:bg-green-100 transition shadow-sm">
          <i className="fa-solid fa-plus text-xl"></i>
        </button>
      </div>

      {/* 2. Scrollable Container for the Grid */}
      {/* - h-[500px] md:h-[600px]: Responsive fixed height
          - pr-2: Right padding to stop scrollbar from covering cards
      */}
      <div className="h-[500px] md:h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {/* Grid System:
            - grid-cols-1: Mobile
            - sm:grid-cols-2: Tablet
            - xl:grid-cols-3: Large Desktop (Since this component is wide)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-2">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsActivity;