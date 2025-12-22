import React, { useState, useEffect, useRef, useContext } from "react";
import { Search, ArrowLeft, Send, Info, X, User, Hash, MoreVertical, Paperclip } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const ChatDashboard = () => {
  const { user } = useContext(AppContext);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Helper to generate consistent colors for user avatars
  const getAvatarColor = (name) => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-orange-500"];
    const index = name ? name.length % colors.length : 0;
    return colors[index];
  };

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await axios.get("http://localhost:3000/api/rooms/my-rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setRooms(data.rooms);
    } catch (error) {
      toast.error("Failed to load rooms");
    }
  };

  const fetchMessages = async (roomId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`http://localhost:3000/api/messages/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setMessages(data.messages);
    } catch (error) {
      toast.error("Failed to load messages");
    }
  };

  // CLEANED SOCKET LISTENER (Single Hook)
  useEffect(() => {
    if (!user) return;

    const handleNewMessage = (newMessage) => {
      setMessages((prev) => {
        const exists = prev.find((m) => m._id === newMessage._id);
        if (exists) return prev;
        // Don't duplicate if I sent it (handled in handleSendMessage)
        if (newMessage.createdBy._id === user._id) return prev;
        return [...prev, newMessage];
      });
    };

    socket.on("receive_message", handleNewMessage);
    return () => socket.off("receive_message", handleNewMessage);
  }, [user]);

  useEffect(() => {
    if (user) fetchRooms();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    fetchMessages(room._id);
    socket.emit("join_room", room._id);
    setIsInfoOpen(false);
    if (window.innerWidth < 768) setIsMobileListVisible(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || !selectedRoom) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `http://localhost:3000/api/messages/${selectedRoom._id}`,
        { text: inputMsg },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
        setInputMsg("");
      }
    } catch (error) {
      toast.error("Message not sent");
    }
  };

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50 relative font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <div className={`absolute inset-0 z-40 bg-white flex flex-col border-r border-slate-200 transition-all duration-300 md:relative md:w-80 lg:w-96 md:transform-none 
        ${isMobileListVisible ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}>
        
        <div className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Messages</h1>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={20} />
            </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
          {rooms.map((room) => (
            <div 
              key={room._id} 
              onClick={() => handleRoomClick(room)} 
              className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center gap-4
                ${selectedRoom?._id === room._id ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "hover:bg-slate-100 text-slate-600"}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${selectedRoom?._id === room._id ? "bg-white/20" : "bg-slate-200"}`}>
                <Hash size={20} className={selectedRoom?._id === room._id ? "text-white" : "text-slate-500"} />
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-bold truncate text-sm uppercase tracking-wide">{room.roomName}</h3>
                <p className={`text-xs truncate opacity-80 ${selectedRoom?._id === room._id ? "text-blue-50" : "text-slate-500"}`}>
                  {room.description || "Active community"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {selectedRoom ? (
          <>
            {/* CHAT HEADER */}
            <div className="h-20 px-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileListVisible(true)} className="md:hidden p-2 hover:bg-slate-100 rounded-lg">
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="font-extrabold text-slate-800 flex items-center gap-2">
                    <span className="text-blue-600">#</span> {selectedRoom.roomName}
                  </h2>
                  <p className="text-[11px] text-green-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Active Now
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsInfoOpen(true)} className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                  <Info size={20} />
                </button>
              </div>
            </div>

            {/* MESSAGES AREA */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
              {messages.map((msg, index) => {
                const isMe = msg.createdBy?._id === user?._id;
                const showSenderName = !isMe;

                return (
                  <div key={msg._id} className={`flex flex-col ${isMe ? "items-end" : "items-start animate-in slide-in-from-left-2 duration-300"}`}>
                    {showSenderName && (
                      <span className="text-[11px] font-bold text-slate-500 ml-12 mb-1 uppercase tracking-tighter">
                        {msg.createdBy?.username || "Family Member"}
                      </span>
                    )}
                    <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? "flex-row-reverse" : ""}`}>
                      {!isMe && (
                        <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${getAvatarColor(msg.createdBy?.username)}`}>
                          {msg.createdBy?.username?.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className={`group relative px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
                        ${isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-slate-100 text-slate-700 rounded-bl-none"}`}>
                        <p>{msg.text}</p>
                        <span className={`text-[9px] mt-1 block opacity-60 font-medium ${isMe ? "text-right" : "text-left"}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT AREA */}
            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center gap-3 bg-slate-100 p-2 rounded-2xl focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <button type="button" className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                  <Paperclip size={20} />
                </button>
                <input 
                  value={inputMsg} 
                  onChange={(e) => setInputMsg(e.target.value)} 
                  placeholder="Type your message..." 
                  className="flex-1 bg-transparent border-none outline-none text-sm py-2" 
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2.5 rounded-xl text-white shadow-md shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <Hash size={40} />
            </div>
            <p className="font-medium text-slate-400 uppercase tracking-widest text-xs">Select a conversation to begin</p>
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR (INFO) */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white border-l border-slate-100 shadow-2xl z-50 transition-transform duration-500 ease-in-out
          ${isInfoOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="h-20 px-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 tracking-tight">Room Information</h3>
          <button onClick={() => setIsInfoOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all text-slate-400">
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl mb-4 flex items-center justify-center text-white shadow-xl shadow-blue-100 mx-auto">
             <Hash size={40} />
          </div>
          <h2 className="font-extrabold text-2xl text-center text-slate-800">{selectedRoom?.roomName}</h2>
          <p className="text-sm text-slate-500 text-center mt-2 px-4 italic leading-relaxed">"{selectedRoom?.description || "A beautiful place for conversation."}"</p>

          <div className="mt-10">
            <h4 className="font-bold text-xs uppercase text-slate-400 tracking-[0.2em] mb-4">Members • {selectedRoom?.members?.length}</h4>
            <div className="space-y-3">
              {selectedRoom?.members?.map((m) => (
                <div key={m._id} className="flex items-center gap-3 group p-2 hover:bg-slate-50 rounded-xl transition-all cursor-default">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm ${getAvatarColor(m.username)}`}>
                    {m.username?.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{m.username}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;