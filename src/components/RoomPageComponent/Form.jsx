import React, { useState } from "react";
import { Plus, X, Home, Users, Send, FileText } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

// Pass setRooms as a prop to update the dashboard instantly
const Form = ({ isOpen, onClose, setRooms }) => {
  const [formData, setFormData] = useState({
    roomName: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Inside your Form.js component
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/rooms/create",
        {
          roomName: formData.roomName,
          description: formData.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("CREATE ROOM RESPONSE:", data.room);
      

      if (data.success) {
        toast.success("Room created!");

        // 🔥 THIS IS THE FIX:
        // We take the new room from the server and add it to the existing list
        setRooms((prevRooms) => [data.room, ...prevRooms]);

        setFormData({ roomName: "", description: "" });
        onClose(); // Close the form
      }
    } catch (error) {
      toast.error("Failed to create room");
    }
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out border-gray-200 ${
        isOpen
          ? "max-h-[1000px] opacity-100 border-b bg-white"
          : "max-h-0 opacity-0 border-b-0 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex bg-blue-100 p-3 rounded-2xl">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Create New Room
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Launch a new space for your team.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* ✅ Single Submit Handler on the Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                Room Name
              </label>
              <div className="relative group">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  required
                  type="text"
                  placeholder="e.g. Project Alpha"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.roomName}
                  onChange={(e) =>
                    setFormData({ ...formData, roomName: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                Description
              </label>
              <div className="relative group">
                <FileText className="absolute left-4 top-5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <textarea
                  placeholder="What's the goal of this room?"
                  rows="3"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between pt-1 lg:pt-7">
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl mb-6 lg:mb-0">
              <div className="flex gap-3 text-blue-800">
                <Users className="w-5 h-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Member Management</p>
                  <p className="text-xs opacity-80 mt-1">
                    You will be the admin of this room. You can invite members
                    via the dashboard after creation.
                  </p>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`w-full py-4 ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]`}
            >
              <Send className="w-5 h-5" />
              <span>{loading ? "Creating..." : "Confirm & Create Room"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
