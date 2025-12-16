import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ArrowLeft, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile,
  Info,
  X,
  User
} from 'lucide-react';

// --- MOCK DATA ---
const MY_CHATS = [
  {
    _id: "room_1",
    roomName: "Weekend Trip 🎰",
    description: "Planning the Vegas road trip.",
    lastMessage: "I'll bring the snacks!",
    timestamp: "10:30 AM",
    unread: 2,
    // Added 'status' to simulate who is present
    members: [
      { _id: "u1", name: "Alice", status: "online", role: "Admin" }, 
      { _id: "u2", name: "Bob", status: "offline", role: "Member" },
      { _id: "u3", name: "Charlie", status: "online", role: "Member" }
    ],
    messages: [
      { _id: "m1", sender: "Alice", text: "Hey guys! Ready for Vegas?", isMe: false, time: "10:00 AM" },
      { _id: "m2", sender: "You", text: "Born ready.", isMe: true, time: "10:05 AM" },
    ]
  },
  {
    _id: "room_2",
    roomName: "Project Alpha 🚀",
    description: "Official project communication channel.",
    lastMessage: "Deadline is Friday.",
    timestamp: "Yesterday",
    unread: 0,
    members: [
      { _id: "u4", name: "Manager", status: "online", role: "Admin" },
      { _id: "u5", name: "Dev 1", status: "busy", role: "Member" }
    ],
    messages: [
      { _id: "m4", sender: "Manager", text: "Deadline is Friday.", isMe: false, time: "9:00 AM" },
    ]
  }
];

const ChatDashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [inputMsg, setInputMsg] = useState("");
  
  // Layout States
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
  const [isInfoOpen, setIsInfoOpen] = useState(false); // Controls the Right Sidebar

  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedRoom?.messages, isInfoOpen]);

  // --- HANDLERS ---
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsInfoOpen(false); // Close info when switching rooms
    if (window.innerWidth < 768) {
      setIsMobileListVisible(false);
    }
  };

  const handleBackToList = () => {
    setIsMobileListVisible(true);
    setIsInfoOpen(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || !selectedRoom) return;

    const newMessage = {
        _id: Date.now(),
        sender: "You",
        text: inputMsg,
        isMe: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedRoom = { 
        ...selectedRoom, 
        messages: [...selectedRoom.messages, newMessage],
        lastMessage: "You: " + inputMsg,
        timestamp: "Just now"
    };
    
    setSelectedRoom(updatedRoom);
    setInputMsg("");
  };

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-white relative font-sans">
      
      {/* =======================================
          1. LEFT SIDEBAR: CHAT LIST
         ======================================= */}
      <div className={`
        absolute inset-0 z-30 bg-white flex flex-col transition-transform duration-300 ease-in-out border-r border-gray-200
        md:relative md:w-80 lg:w-96 md:transform-none md:z-auto
        ${isMobileListVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex flex-col gap-3 pt-safe-top">
            <h1 className="text-xl font-bold text-gray-800">Chats</h1>
            <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
            {MY_CHATS.map((chat) => (
                <div 
                    key={chat._id}
                    onClick={() => handleRoomClick(chat)}
                    className={`flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50
                        ${selectedRoom?._id === chat._id ? 'bg-blue-50/60' : ''}
                    `}
                >
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg flex-shrink-0">
                        {chat.roomName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-semibold text-gray-900 truncate">{chat.roomName}</h3>
                            <span className="text-xs text-gray-400">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* =======================================
          2. MIDDLE: CHAT WINDOW
         ======================================= */}
      <div className="absolute inset-0 md:relative flex-1 bg-gray-50 flex flex-col min-w-0 z-0">
        
        {selectedRoom ? (
            <>
                {/* Header */}
                <div className="h-16 px-4 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm z-10 pt-safe-top">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <button onClick={handleBackToList} className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                            {selectedRoom.roomName.charAt(0)}
                        </div>
                        <div className="min-w-0 cursor-pointer" onClick={() => setIsInfoOpen(!isInfoOpen)}>
                            <h2 className="font-bold text-gray-900 text-sm md:text-base truncate">{selectedRoom.roomName}</h2>
                            <p className="text-xs text-gray-500 truncate">
                                {selectedRoom.members.map(m => m.name).join(", ")}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 md:gap-3 text-gray-500">
                         {/* Toggle Info Sidebar Button */}
                        <button 
                            onClick={() => setIsInfoOpen(!isInfoOpen)}
                            className={`p-2 rounded-full hover:bg-gray-100 transition ${isInfoOpen ? 'bg-blue-50 text-blue-600' : ''}`}
                        >
                            <Info className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#eefeef]/30">
                    {selectedRoom.messages.map((msg) => (
                        <div key={msg._id} className={`flex w-full ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-2 shadow-sm relative group
                                ${msg.isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'}
                            `}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <span className={`text-[10px] mt-1 block opacity-70 text-right ${msg.isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="bg-white px-4 py-3 border-t border-gray-200 pb-safe-bottom">
                    <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                        <div className="flex-1 bg-gray-100 rounded-2xl flex items-center px-4 py-2">
                            <input 
                                type="text"
                                value={inputMsg}
                                onChange={(e) => setInputMsg(e.target.value)}
                                placeholder="Type a message..."
                                className="bg-transparent border-none focus:ring-0 flex-1 text-sm text-gray-800 placeholder-gray-500 outline-none"
                            />
                        </div>
                        <button type="submit" disabled={!inputMsg.trim()} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md transition-all active:scale-95">
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </>
        ) : (
            <div className="hidden md:flex flex-col items-center justify-center h-full text-gray-400">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-10 h-10 text-gray-300" />
                </div>
                <p>Select a chat to start messaging</p>
            </div>
        )}
      </div>

      {/* =======================================
          3. RIGHT SIDEBAR: ROOM INFO
         ======================================= */}
      {selectedRoom && (
        <div className={`
            absolute inset-y-0 right-0 z-40 w-full sm:w-80 bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ease-in-out
            md:relative md:transform-none md:w-0 md:shadow-none md:border-none
            ${isInfoOpen ? 'translate-x-0 md:w-80 md:border-l' : 'translate-x-full md:w-0 md:overflow-hidden'}
        `}>
            {/* Right Sidebar Header */}
            <div className="h-16 px-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <h3 className="font-bold text-gray-800">Room Info</h3>
                <button onClick={() => setIsInfoOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Right Sidebar Content */}
            <div className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
                
                {/* Room Details */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold mb-3">
                        {selectedRoom.roomName.charAt(0)}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 text-center">{selectedRoom.roomName}</h2>
                    <p className="text-sm text-gray-500 text-center mt-1">{selectedRoom.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-around mb-6 pb-6 border-b border-gray-100">
                    <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                            <Phone className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-500">Audio</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                            <Video className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-500">Video</span>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                            <Search className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-500">Search</span>
                    </div>
                </div>

                {/* MEMBERS LIST */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-bold text-gray-700">Members</h4>
                        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium">
                            {selectedRoom.members.length} Total
                        </span>
                    </div>

                    <div className="space-y-3">
                        {selectedRoom.members.map((member) => (
                            <div key={member._id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                        <p className="text-xs text-gray-500">{member.role}</p>
                                    </div>
                                </div>
                                
                                {/* Status Indicator */}
                                <div className={`flex items-center gap-1 text-xs font-medium 
                                    ${member.status === 'online' ? 'text-green-600' : 
                                      member.status === 'busy' ? 'text-red-500' : 'text-gray-400'}
                                `}>
                                    <span className={`w-2 h-2 rounded-full 
                                        ${member.status === 'online' ? 'bg-green-500' : 
                                          member.status === 'busy' ? 'bg-red-500' : 'bg-gray-300'}
                                    `}></span>
                                    <span className="capitalize">{member.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

export default ChatDashboard;