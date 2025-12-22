import React, { useState, useEffect, useRef, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import {
  Navigation,
  Search,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Maximize,
  Compass,
  User,
  Activity,
} from "lucide-react";
import { AppContext } from "../../context/AppContext"; // Import your user context
import { io } from "socket.io-client";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

const socket = io("http://localhost:3000");

// --- MAP UTILS ---
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

// Dynamic Routing between ME and CLICKED USER
const RoutingLayer = ({ me, target }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!map || !me || !target) return;

    // Remove old route if exists
    if (routingRef.current) {
      map.removeControl(routingRef.current);
    }

    routingRef.current = L.Routing.control({
      waypoints: [L.latLng(me[0], me[1]), L.latLng(target[0], target[1])],
      routeWhileDragging: false,
      addWaypoints: false,
      show: false,
      createMarker: () => null, // Don't show extra markers
      lineOptions: {
        styles: [
          { color: "#6366f1", weight: 5, opacity: 0.7, dashArray: "10, 10" },
        ],
      },
    }).addTo(map);

    return () => {
      if (routingRef.current) map.removeControl(routingRef.current);
    };
  }, [map, me, target]);

  return null;
};

const RoomMemberMap = () => {
  const { user } = useContext(AppContext);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [membersLocation, setMembersLocation] = useState({});
  const [targetUser, setTargetUser] = useState(null);
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  // 1. GLOBAL TRACKING: Starts as soon as user is available
  useEffect(() => {
    if (!user?._id) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMembersLocation((prev) => ({
          ...prev,
          [user._id]: [latitude, longitude],
        }));

        socket.emit("send_location", {
          userId: user._id,
          latitude,
          longitude,
        });
      },
      (err) => {
        // Handle the timeout gracefully
        if (err.code === 3) {
          console.warn("GPS Timeout: Retrying to find signal...");
        } else {
          console.error("GPS Error:", err.message);
        }
      },
      {
        enableHighAccuracy: true, // Keep this true for better precision
        timeout: 30000, // Increase to 30 seconds
        maximumAge: 10000, // Accept a location cached in the last 10 seconds
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [user?._id]); // Only depends on user ID, not selectedRoom

  // 2. SOCKET LISTENER: Always listening for anyone in any of your rooms
  useEffect(() => {
    socket.on("receive_location", (data) => {
      setMembersLocation((prev) => ({
        ...prev,
        [data.userId]: [data.latitude, data.longitude],
      }));
    });
    return () => socket.off("receive_location");
  }, []);

  // 3. FETCH ROOMS & INITIAL LOCATIONS
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:3000/api/rooms/my-rooms",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          setRooms(data.rooms);

          // Optimization: Set initial positions from member data if available
          const initialLocs = {};
          data.rooms.forEach((room) => {
            room.members.forEach((m) => {
              if (m.location?.latitude) {
                initialLocs[m._id] = [
                  m.location.latitude,
                  m.location.longitude,
                ];
              }
            });
          });
          setMembersLocation((prev) => ({ ...initialLocs, ...prev }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchInitialData();
  }, [user]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setTargetUser(null);
    socket.emit("join_room", { roomId: room._id });
    if (window.innerWidth < 768) setIsMobileListVisible(false);
  };

  const myPos = membersLocation[user?._id];
  const targetPos = targetUser ? membersLocation[targetUser._id] : null;

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50 relative font-sans text-slate-900">
      {/* SIDEBAR - Exactly the same UI as before */}
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
                  {room.members.map((m) => (
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
                      {membersLocation[m._id] ? (
                        <span className="flex items-center gap-1.5">
                          <span className="text-[9px] opacity-60 italic text-white">
                            Live
                          </span>
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                        </span>
                      ) : (
                        <span className="opacity-40 italic text-[9px]">
                          no signal
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MAP AREA - UI stays the same */}
      <div className="flex-1 relative bg-slate-200">
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
                    : "All members live"}
                </p>
              </div>
              {targetUser && (
                <button
                  onClick={() => setTargetUser(null)}
                  className="text-[10px] font-bold text-indigo-600 hover:underline"
                >
                  Show All
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
              if (!pos) return null;
              return (
                <Marker key={member._id} position={pos}>
                  <Popup className="custom-popup">
                    <div className="text-center p-1">
                      <p className="font-bold text-slate-800">
                        {member._id === user?._id ? "You" : member.username}
                      </p>
                      {member._id !== user?._id && (
                        <button
                          onClick={() => setTargetUser(member)}
                          className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px]"
                        >
                          Plot Route
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}

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
