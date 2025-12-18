import React, { useState } from 'react';
import Navbar from '../components/NavbarComponent/Navbar';
import Form from '../components/RoomPageComponent/Form';
import RoomDashboard from '../components/RoomPageComponent/RoomDashboard';

const RoomPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // MOCK DATA: Matching your Mongoose Schema precisely
  const [rooms, setRooms] = useState([
    {
      _id: "65cb...01",
      roomName: "Engineering Team 🛠️",
      description: "Daily standups and technical architecture discussions.",
      createdBy: "user_99", // This matches the Schema 'createdBy'
      members: ["user_99", "user_101", "user_102"],
      presentUsers: ["user_99"],
      chats: [],
      createdAt: "2024-02-10T10:00:00Z"
    },
    {
      _id: "65cb...02",
      roomName: "Family Lounge 🏠",
      description: "Sharing photos and weekend plans.",
      createdBy: "user_different",
      members: ["user_99", "user_other"],
      presentUsers: [],
      chats: ["msg_001", "msg_002"],
      createdAt: "2024-01-05T14:30:00Z"
    }
  ]);

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      {/* Passing isOpen to control the slide-down animation */}
      <Form isOpen={isFormOpen} onClose={toggleForm} />

      <RoomDashboard 
        rooms={rooms} 
        currentUserId="user_99" // Example: The logged-in user
        onCreateClick={toggleForm} 
      />
    </div>
  );
};

export default RoomPage;