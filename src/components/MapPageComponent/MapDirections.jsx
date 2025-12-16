import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

// --- Fix Leaflet Icons ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/**
 * =======================================================
 * ROUTING COMPONENT (Handles the Blue Line)
 * =======================================================
 */
const RoutingControl = ({ start, end }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  // 1. Create the routing instance ONCE
  useEffect(() => {
    if (!map) return;

    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(start), L.latLng(end)],
      routeWhileDragging: false,
      show: false,            // Hide the turn-by-turn text box
      addWaypoints: false,    // Disable adding points by clicking line
      draggableWaypoints: false,
      fitSelectedRoutes: false, 
      lineOptions: {
        styles: [{ color: "#000000", weight: 6, opacity: 0.7 }]
      }
    });

    routingControlRef.current.addTo(map);

    return () => {
        try {
            map.removeControl(routingControlRef.current);
        } catch (e) {
            console.warn("Cleanup error", e);
        }
    };
  }, [map]); 

  // 2. Update the path when coordinates change
  useEffect(() => {
    if (routingControlRef.current) {
      routingControlRef.current.setWaypoints([
        L.latLng(start),
        L.latLng(end)
      ]);
    }
  }, [start, end]);

  return null;
};

/**
 * =======================================================
 * MAIN COMPONENT: MapDirections
 * =======================================================
 */
const MapDirections = () => {
  // 1. STATE: Live Coordinates
  const [user1, setUser1] = useState([40.7128, -74.0060]); 
  const [user2, setUser2] = useState([40.7300, -73.9950]); 

  // 2. SIMULATION: Update User 1's location every 3 seconds
  // (In your real app, this data would come from your Backend/Socket.io)
  useEffect(() => {
    const interval = setInterval(() => {
      setUser1((prev) => [
        prev[0] + 0.0002, // Move slightly North
        prev[1] + 0.0002  // Move slightly East
      ]);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
      
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-xl font-bold text-gray-900">Map Direction</h2>
            <p className="text-gray-500 text-sm flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Tracking User 1 Live
            </p>
        </div>
        <div className="text-xs font-mono bg-gray-100 px-3 py-1 rounded-md text-gray-600">
           {user1[0].toFixed(5)}, {user1[1].toFixed(5)}
        </div>
      </div>

      <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-300 relative z-0">
        <MapContainer 
          center={user1} 
          zoom={13} 
          scrollWheelZoom={true} 
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User 1: The moving driver/user */}
          <Marker position={user1}>
             <Popup>User 1 (Moving)</Popup>
          </Marker>

          {/* User 2: The destination */}
          <Marker position={user2}>
             <Popup>User 2 (Target)</Popup>
          </Marker>

          {/* The Connection Line */}
          <RoutingControl start={user1} end={user2} />

        </MapContainer>
      </div>
    </div>
  );
};

export default MapDirections;