import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { 
  Users, 
  MapPin, 
  ChevronRight, 
  Search, 
  Layout, 
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

// --- ICON FIX ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// --- MOCK DATA ---
const MY_ROOMS = [
  {
    _id: "65a001",
    roomName: "Weekend Trip 🎰",
    description: "Coordinating the road trip convoy.",
    members: [
      { _id: "u1", name: "Alice", location: [36.1699, -115.1398] }, 
      { _id: "u2", name: "Bob", location: [34.0522, -118.2437] }, 
    ]
  },
  {
    _id: "65a002",
    roomName: "Delivery #559 🍔",
    description: "Tracking delivery from downtown.",
    members: [
      { _id: "d1", name: "Dasher", location: [40.7128, -74.0060] },
      { _id: "c1", name: "Sarah", location: [40.7300, -73.9950] } 
    ]
  }
];

// --- CRITICAL FIX: MAP RE-SIZER ---
// This forces Leaflet to redraw when the mobile view toggles
const MapInvalidator = ({ isMobileListVisible }) => {
  const map = useMap();
  
  useEffect(() => {
    // Wait a tiny bit for the animation/transition to finish, then resize
    const timer = setTimeout(() => {
        map.invalidateSize();
    }, 300); 
    
    return () => clearTimeout(timer);
  }, [isMobileListVisible, map]);

  return null;
};

const FitBoundsToMembers = ({ members }) => {
  const map = useMap();
  useEffect(() => {
    if (!members || members.length === 0) return;
    const bounds = L.latLngBounds(members.map(m => m.location));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [members, map]);
  return null;
};

const RoutingLayer = ({ members }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!map || members.length < 2) return;
    const start = members[0].location;
    const end = members[1].location;

    routingRef.current = L.Routing.control({
      waypoints: [L.latLng(start), L.latLng(end)],
      routeWhileDragging: false,
      show: false, 
      addWaypoints: false,
      fitSelectedRoutes: false,
      lineOptions: { styles: [{ color: "#6366f1", weight: 5, opacity: 0.7 }] }
    });
    routingRef.current.addTo(map);
    return () => { try { map.removeControl(routingRef.current); } catch(e) {} };
  }, [map, members]);
  return null;
};

const RoomMemberMap = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  // Start with TRUE (List is visible). 
  // When FALSE, Map is visible.
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    if (window.innerWidth < 768) {
      setIsMobileListVisible(false); // Hide list, show map
    }
  };

  const handleBack = () => {
    setIsMobileListVisible(true); // Show list, hide map
  };

  return (
    // Use h-[100dvh] for mobile browser support
    <div className="flex flex-col md:flex-row h-[100dvh] w-full overflow-hidden bg-gray-100 relative">
      
      {/* =======================
          SIDEBAR (ROOM LIST)
         ======================= */}
      <div className={`
        absolute inset-0 z-30 bg-white flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:w-96 md:transform-none md:z-10 shadow-xl border-r border-gray-200
        ${isMobileListVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* List Header */}
        <div className="p-4 border-b border-gray-100 bg-gray-50 pt-safe-top">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Layout className="w-5 h-5 text-indigo-600" /> My Rooms
          </h1>
        </div>

        {/* List Body */}
        <div className="flex-1 overflow-y-auto p-2 pb-20">
          {MY_ROOMS.map((room) => (
            <div 
              key={room._id}
              onClick={() => handleRoomClick(room)}
              className="p-4 mb-2 bg-white rounded-xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{room.roomName}</h3>
                  <ChevronRight className="text-gray-300 w-5 h-5" />
              </div>
              <p className="text-xs text-gray-500">{room.description}</p>
              <div className="mt-2 text-xs font-medium text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded">
                {room.members.length} Members
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =======================
          MAP CONTAINER
         ======================= */}
      <div className="absolute inset-0 md:relative md:flex-1 w-full h-full z-0 bg-gray-200">
        
        {/* Mobile "Back" Button (Floating on top of Map) */}
        {!isMobileListVisible && (
          <div className="absolute top-4 left-4 z-[1000] md:hidden">
            <button 
              onClick={handleBack}
              className="bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 flex items-center justify-center active:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        )}

        {selectedRoom ? (
          <MapContainer 
            center={[0,0]} 
            zoom={2} 
            className="w-full h-full"
            zoomControl={false} // Move zoom control if needed
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {/* 1. THE FIX: Resizes map when mobile view changes */}
            <MapInvalidator isMobileListVisible={isMobileListVisible} />
            
            {/* 2. Markers */}
            {selectedRoom.members.map((member) => (
              <Marker key={member._id} position={member.location}>
                <Popup>{member.name}</Popup>
              </Marker>
            ))}

            {/* 3. Logic */}
            <RoutingLayer members={selectedRoom.members} />
            <FitBoundsToMembers members={selectedRoom.members} />

          </MapContainer>
        ) : (
          <div className="hidden md:flex h-full w-full items-center justify-center text-gray-400">
            Select a room
          </div>
        )}
      </div>

    </div>
  );
};

export default RoomMemberMap;