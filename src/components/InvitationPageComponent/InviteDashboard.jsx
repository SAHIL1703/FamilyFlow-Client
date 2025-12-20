import React, { useContext, useEffect, useState } from "react";
import {
  Plus,
  X,
  Mail,
  Send,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  Home,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

// --- MOCK DATA: Available Rooms (You would fetch this from your DB) ---
// We need this because to create an Invite, we need a 'roomId'
const MY_ROOMS = [
  { _id: "room_101", name: "The Smith Family" },
  { _id: "room_102", name: "Gaming Squad 🎮" },
  { _id: "room_103", name: "Project Alpha" },
];

const InviteDashboard = ({stats}) => {
  const [openForm, setOpenForm] = useState(false); // Default closed for cleaner UI
  const [myRooms, setMyRooms] = useState([]);
  const { user } = useContext(AppContext);

  const fetchUserAllRooms = async () => {
    // 1. Guard Clause: Don't run if user isn't loaded yet
    if (!user || !user._id) return;

    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/rooms/my-rooms",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        // Now user._id is guaranteed to exist here
        const formattedRooms = data.rooms
          .filter((room) => room.createdBy._id === user._id)
          .map((room) => [room._id, room.roomName]);

        setMyRooms(formattedRooms);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching Rooms: ", errorMsg);
      toast.error("Error fetching Rooms: " + errorMsg);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    roomId: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleOpeningForm = () => {
    setOpenForm(!openForm);
    // Reset form when closing/opening
    if (!openForm) {
      setFormData({ email: "", roomId: "" });
      setStatus("idle");
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.email || !formData.roomId) return;

    setStatus("loading");

    // --- SIMULATE API CALL ---
    // Payload matches your Mongoose Schema: { roomId, receiverEmail }
    const payload = {
      roomId: formData.roomId,
      receiverEmail: formData.email,
      // senderId is usually handled by the backend via the Auth Token (req.user._id)
    };

    try {
      const token = localStorage.getItem("token");
      const {data} = await axios.post("http://localhost:3000/api/invites/send" , payload,{
        headers : {Authorization : `Bearer ${token}`}
      })
      console.log(data);
      if(data.success){
         setStatus("success");
         setFormData({
          email : "",
          roomId : ""
         })
         setStatus("idle")
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error Sending Invite ", errorMsg);
      toast.error("Error Sending Invite " + errorMsg);
      setStatus("idle")
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAllRooms();
      console.log("User : ", user);
    }
  }, [user]);

  return (
    <div className="bg-gray-50 py-8">
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Invite Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your invitations and grow your community.
          </p>
        </div>

        <button
          onClick={handleOpeningForm}
          className={`
            flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 active:scale-95
            ${
              openForm
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
            }
          `}
        >
          {openForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          <span>{openForm ? "Close Form" : "Create New Invite"}</span>
        </button>
      </div>

      {/* --- THE INVITE FORM (Collapsible) --- */}
      <div
        className={`max-w-7xl mx-auto px-4 overflow-hidden transition-all duration-500 ease-in-out ${
          openForm ? "max-h-[500px] opacity-100 mb-8" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white rounded-2xl border border-blue-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Send className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Send Invitation
              </h2>
              <p className="text-sm text-gray-500">
                The user will receive an email to join your room.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-6 items-start"
          >
            {/* 1. Select Room (Required by Schema: roomId) */}
            <div className="w-full md:w-1/3 space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Home className="w-4 h-4 text-gray-400" /> Select Room
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.roomId}
                  onChange={(e) =>
                    setFormData({ ...formData, roomId: e.target.value })
                  }
                  className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8 outline-none transition-all"
                >
                  <option value="" disabled>
                    Choose a room...
                  </option>
                  {myRooms.map((room) => (
                    <option key={room[0]} value={room[0]}>
                      {room[1]}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 2. Email Input (Required by Schema: receiverEmail) */}
            <div className="w-full md:w-1/2 space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" /> Receiver Email
              </label>
              <input
                type="email"
                required
                placeholder="friend@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full md:w-auto mt-auto pt-7">
              <button
                type="submit"
                disabled={status === "loading"}
                className={`
                    w-full md:w-auto px-8 py-3 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-2
                    ${
                      status === "success"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-900 hover:bg-black hover:shadow-gray-500/30"
                    }
                  `}
              >
                {status === "loading" && (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                )}
                {status === "success" ? "Invite Sent!" : "Send Invite"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <hr className="border-t border-gray-200 my-2" />
      </div>

      {/* --- STATISTICS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto gap-6 px-4 my-8">
        {/* Total Invites */}
        <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium text-sm">Total Sent</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Accepted */}
        <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium text-sm">Accepted</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.accepted}</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium text-sm">Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Rejected */}
        <div className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-200 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium text-sm">Rejected</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.rejected}</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:scale-110 transition-transform">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteDashboard;
