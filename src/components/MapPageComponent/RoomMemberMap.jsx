import React, { useState, useEffect, useRef, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import {
  Search,
  ArrowLeft,
  Compass,
  User,
  Activity,
  Navigation
} from "lucide-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

// IMPORT SHARED SOCKET
import { socket } from "../../socket";

// --- 1. MAP INVALIDATOR (Fixes Grey Tiles on resize) ---
const MapInvalidator = ({ isMobileListVisible }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);
    return () => clearTimeout(timer);
  }, [isMobileListVisible, map]);
  return null;
};

// --- 2. OPTIMIZED ROUTING LAYER (Fixes the Crash) ---
const RoutingLayer = ({ me, target }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  // A. Initialize Control ONCE when map loads
  useEffect(() => {
    if (!map) return;

    // Create the control instance
    routingControlRef.current = L.Routing.control({
      waypoints: [], // Start empty
      routeWhileDragging: false,
      addWaypoints: false,
      show: false, // Hide text instructions
      fitSelectedRoutes: false, // Don't auto-zoom constantly
      createMarker: () => null, // Hide default markers (we use our own)
      lineOptions: {
        styles: [
          { color: "#6366f1", weight: 5, opacity: 0.7, dashArray: "10, 10" },
        ],
      },
      // Explicitly set OSRM service (removes ambiguity)
      serviceUrl: 'https://router.project-osrm.org/route/v1',
      router: new L.Routing.OSRMv1({
         serviceUrl: 'https://router.project-osrm.org/route/v1'
      })
    });
    
    routingControlRef.current.addTo(map);

    // Cleanup: Safely remove control
    return () => {
      if (map && routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (error) {
          console.warn("Routing cleanup handled gracefully");
          console.log(error.message);
        }
      }
    };
  }, [map]); 

  // B. Update Waypoints Dynamicallly (No crashing)
  useEffect(() => {
    if (!routingControlRef.current || !me || !target) return;

    try {
        const waypoints = [
            L.latLng(me[0], me[1]),
            L.latLng(target[0], target[1])
        ];
        routingControlRef.current.setWaypoints(waypoints);
    } catch (error) {
        console.error("Error updating route:", error);
    }

  }, [me, target]); // Only run this when coordinates change

  return null;
};

// --- 3. MAIN COMPONENT ---
const RoomMemberMap = () => {
  const { user } = useContext(AppContext);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  // State for Map Data
  const [membersLocation, setMembersLocation] = useState({});
  const [onlineStatus, setOnlineStatus] = useState({}); // { userId: "online" | "offline" }

  const [targetUser, setTargetUser] = useState(null);
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  // --- SOCKET LISTENERS ---
  useEffect(() => {
    // 1. Receive Location Update
    const handleReceiveLocation = (data) => {
      setMembersLocation((prev) => ({
        ...prev,
        [data.userId]: [data.latitude, data.longitude],
      }));
      // If sending location, they are online
      setOnlineStatus((prev) => ({ ...prev, [data.userId]: "online" }));
    };

    // 2. Receive Status Change (Online/Offline)
    const handleStatusChange = (data) => {
        // console.log(`User ${data.userId} is now ${data.status}`);
        setOnlineStatus((prev) => ({
            ...prev,
            [data.userId]: data.status 
        }));
    };

    socket.on("receive_location", handleReceiveLocation);
    socket.on("user_status_change", handleStatusChange);

    return () => {
      socket.off("receive_location", handleReceiveLocation);
      socket.off("user_status_change", handleStatusChange);
    };
  }, []);

  // --- FETCH ROOMS ---
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "https://familyflow-kun4.onrender.com/api/rooms/my-rooms",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.success) {
          setRooms(data.rooms);
          
          // Initial Offline/Online status from DB
          const initialStatus = {};
          data.rooms.forEach(room => {
             room.members.forEach(m => {
                 initialStatus[m._id] = m.isOnline ? "online" : "offline";
             });
          });
          if(user) initialStatus[user._id] = "online";
          setOnlineStatus(prev => ({...initialStatus, ...prev}));
        }
      } catch (err) {
        console.error("Fetch rooms error", err);
      }
    };
    if (user) fetchRooms();
  }, [user]);

  // --- HANDLE ROOM CLICK ---
  const handleRoomClick = async (room) => {
    setSelectedRoom(room);
    setTargetUser(null);
    if (window.innerWidth < 768) setIsMobileListVisible(false);

    // Fetch LATEST DB Locations immediately
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`https://familyflow-kun4.onrender.com/api/location/room/${room._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if(data.success) {
            const dbLocs = {};
            data.locations.forEach(loc => {
                dbLocs[loc.userId._id] = [loc.latitude, loc.longitude];
            });
            setMembersLocation(prev => ({ ...prev, ...dbLocs }));
        }
    } catch (error) {
        console.error("Error fetching room locations:", error);
    }
  };

  const myPos = membersLocation[user?._id];
  const targetPos = targetUser ? membersLocation[targetUser._id] : null;

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50 relative font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <div
        className={`absolute inset-0 z-40 bg-white flex flex-col border-r border-slate-200 transition-all duration-300 md:relative md:w-80 lg:w-96 md:transform-none 
        ${isMobileListVisible ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Tracking
            </h1>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Activity size={20} className="animate-pulse" />
            </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search Rooms..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-20">
          {rooms.map((room) => (
            <div
              key={room._id}
              onClick={() => handleRoomClick(room)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border
                ${
                  selectedRoom?._id === room._id
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-white border-slate-100"
                }`}
            >
              <h3 className="font-bold text-sm mb-1">{room.roomName}</h3>
              <p className="text-[10px] opacity-70 mb-2">
                {room.members?.length} Members
              </p>

              {selectedRoom?._id === room._id && (
                <div className="mt-3 space-y-2 pt-3 border-t border-white/20">
                  {room.members.map((m) => {
                    const isUserOnline = onlineStatus[m._id] === "online";
                    return (
                        <div
                        key={m._id}
                        onClick={(e) => {
                            e.stopPropagation();
                            setTargetUser(m);
                        }}
                        className={`flex items-center justify-between p-2 rounded-lg text-[11px] transition-colors ${
                            targetUser?._id === m._id
                            ? "bg-white text-indigo-600"
                            : "hover:bg-white/10"
                        }`}
                        >
                        <span className="flex items-center gap-2">
                            <User size={12} /> {m.username}
                        </span>
                        
                        {/* Status Indicator */}
                        <div className="flex items-center gap-1.5">
                            {isUserOnline ? (
                                <>
                                <span className="text-[9px] opacity-60 italic text-white">Live</span>
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                                </>
                            ) : (
                                <>
                                <span className="text-[9px] opacity-60 italic text-slate-300">Offline</span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                </>
                            )}
                        </div>
                        </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- MAP AREA --- */}
      <div className="flex-1 relative bg-slate-200">
        
        {/* Mobile Toggle & Header */}
        <div className="absolute top-4 left-4 right-4 z-[1000] flex items-center gap-3">
          {!isMobileListVisible && (
            <button
              onClick={() => setIsMobileListVisible(true)}
              className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white md:hidden"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {selectedRoom && (
            <div className="flex-1 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold uppercase tracking-tight">
                  {selectedRoom.roomName}
                </h2>
                <p className="text-[10px] text-slate-500">
                  {targetUser
                    ? `Tracking ${targetUser.username}`
                    : "Room Overview"}
                </p>
              </div>
              {targetUser && (
                <button
                  onClick={() => setTargetUser(null)}
                  className="text-[10px] font-bold text-indigo-600 hover:underline"
                >
                  Clear Route
                </button>
              )}
            </div>
          )}
        </div>

        {selectedRoom ? (
          <MapContainer
            center={[20, 78]}
            zoom={5}
            className="w-full h-full z-0"
            zoomControl={false}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            <MapInvalidator isMobileListVisible={isMobileListVisible} />

            {selectedRoom.members.map((member) => {
              const pos = membersLocation[member._id];
              const isUserOnline = onlineStatus[member._id] === "online";
              
              if (!pos) return null; 
              
              return (
                <Marker key={member._id} position={pos} opacity={isUserOnline ? 1.0 : 0.6}>
                  <Popup className="custom-popup">
                    <div className="text-center p-1">
                      <p className="font-bold text-slate-800">
                        {member._id === user?._id ? "You" : member.username}
                      </p>
                      <p className={`text-[10px] mb-2 ${isUserOnline ? "text-green-600 font-bold" : "text-slate-500"}`}>
                        {isUserOnline ? "● Live Now" : "● Offline (Last Known)"}
                      </p>
                      
                      {member._id !== user?._id && (
                        <button
                          onClick={() => setTargetUser(member)}
                          className="mt-1 flex items-center justify-center gap-1 w-full bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[10px]"
                        >
                          <Navigation size={10} /> Route
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* RENDER OPTIMIZED ROUTING LAYER */}
            {myPos && targetPos && (
              <RoutingLayer me={myPos} target={targetPos} />
            )}
          </MapContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 gap-4">
            <Compass size={40} className="opacity-20 animate-spin-slow" />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              Select a room to track members
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomMemberMap;