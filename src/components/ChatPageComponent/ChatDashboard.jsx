import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Search,
  ArrowLeft,
  Send,
  Phone,
  Video,
  Info,
  X,
  User,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const ChatDashboard = () => {
  const { user } = useContext(AppContext);

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");

  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const messagesEndRef = useRef(null);

  /* ================= SCROLL ================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isInfoOpen]);

  /* ================= FETCH ROOMS ================= */
  const fetchRooms = async () => {
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
      }
    } catch (error) {
      toast.error("Failed to load rooms");
    }
  };

  /* ================= FETCH MESSAGES ================= */
  const fetchMessages = async (roomId) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `http://localhost:3000/api/messages/${roomId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error("Failed to load messages");
    }
  };

  /* ================= SELECT ROOM ================= */
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    fetchMessages(room._id);
    setIsInfoOpen(false);

    if (window.innerWidth < 768) {
      setIsMobileListVisible(false);
    }
  };

  const handleBackToList = () => {
    setIsMobileListVisible(true);
    setIsInfoOpen(false);
  };

  /* ================= SEND MESSAGE ================= */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || !selectedRoom) return;

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `http://localhost:3000/api/messages/${selectedRoom._id}`,
        { text: inputMsg },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
        setInputMsg("");
      }
    } catch (error) {
      toast.error("Message not sent");
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    if (user) fetchRooms();
  }, [user]);

  /* ================= UI ================= */
  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-white relative font-sans">

      {/* ========== LEFT SIDEBAR ========== */}
      <div
        className={`absolute inset-0 z-30 bg-white flex flex-col border-r border-gray-200 transition-transform duration-300
        md:relative md:w-80 lg:w-96 md:transform-none
        ${isMobileListVisible ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-4 py-3 bg-gray-50 border-b">
          <h1 className="text-xl font-bold">Chats</h1>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 border rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {rooms.map((room) => (
            <div
              key={room._id}
              onClick={() => handleRoomClick(room)}
              className={`p-4 cursor-pointer border-b hover:bg-gray-50
                ${selectedRoom?._id === room._id ? "bg-blue-50" : ""}`}
            >
              <h3 className="font-semibold truncate">{room.roomName}</h3>
              <p className="text-sm text-gray-500 truncate">
                {room.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========== CHAT WINDOW ========== */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedRoom ? (
          <>
            <div className="h-16 px-4 bg-white border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToList}
                  className="md:hidden"
                >
                  <ArrowLeft />
                </button>
                <h2 className="font-bold">{selectedRoom.roomName}</h2>
              </div>
              <button onClick={() => setIsInfoOpen(!isInfoOpen)}>
                <Info />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => {
                const isMe = msg.createdBy._id === user._id;
                return (
                  <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`px-4 py-2 rounded-2xl max-w-[70%]
                      ${isMe ? "bg-blue-600 text-white" : "bg-white border"}`}>
                      <p>{msg.text}</p>
                      <span className="text-[10px] opacity-60 block text-right">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2">
              <input
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-xl outline-none"
              />
              <button className="bg-blue-600 p-3 rounded-full text-white">
                <Send />
              </button>
            </form>
          </>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* ========== RIGHT SIDEBAR ========== */}
      {selectedRoom && (
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white border-l shadow-xl transition-transform
          ${isInfoOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="h-16 px-4 border-b flex justify-between items-center">
            <h3 className="font-bold">Room Info</h3>
            <button onClick={() => setIsInfoOpen(false)}>
              <X />
            </button>
          </div>

          <div className="p-4">
            <h2 className="font-bold text-lg">{selectedRoom.roomName}</h2>
            <p className="text-sm text-gray-500">{selectedRoom.description}</p>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Members</h4>
              {selectedRoom.members.map((m) => (
                <div key={m._id} className="flex items-center gap-2 py-2">
                  <User size={16} />
                  <span>{m.username || "User"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDashboard;
