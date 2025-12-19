import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/NavbarComponent/Navbar';
import Form from '../components/RoomPageComponent/Form';
import RoomDashboard from '../components/RoomPageComponent/RoomDashboard';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RoomPage = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useContext(AppContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // If no token, redirect to login immediately
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchRoomsData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/rooms/my-rooms", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data.success) {
          setRooms(data.rooms);
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.error("Error fetching rooms:", errorMsg);
        toast.error("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomsData();
    
    // We remove [user, navigate] here. 
    // [] ensures this only runs ONCE when the component mounts.
  }, []); 

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  // FIX: Safety check for the user. If user is null, we show a loader or return null.
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      {/* TIP: Pass setRooms to Form so that when a room is created, 
         you can update the list without a fresh API call 
      */}
      <Form 
        isOpen={isFormOpen} 
        onClose={toggleForm} 
        setRooms={setRooms}
      />

      <RoomDashboard 
        rooms={rooms} 
        setRooms={setRooms}
        isLoading={loading}
        currentUserId={user._id} 
        onCreateClick={toggleForm} 
      />
    </div>
  );
};

export default RoomPage;