import React, { useState } from 'react';
import { 
  Mail, 
  Check, 
  X, 
  Clock, 
  User, 
  ArrowRight,
  ShieldAlert,
  Inbox,
  Send,
  Trash2
} from 'lucide-react';

// --- MOCK DATA: INCOMING INVITES (Received) ---
const MOCK_RECEIVED = [
  {
    _id: "inv_in_1",
    roomId: { _id: "r1", roomName: "React Devs ⚛️" },
    senderId: { name: "Sarah Jenkins" },
    status: "pending",
    createdAt: "2024-01-10T14:30:00.000Z"
  },
  {
    _id: "inv_in_2",
    roomId: { _id: "r2", roomName: "Sunday Football 🏈" },
    senderId: { name: "Mike Ross" },
    status: "accepted",
    createdAt: "2024-01-08T09:00:00.000Z"
  }
];

// --- MOCK DATA: OUTGOING INVITES (Sent by Me) ---
const MOCK_SENT = [
  {
    _id: "inv_out_1",
    roomId: { _id: "r3", roomName: "My Private Project" },
    receiverEmail: "john.doe@gmail.com", // Who I invited
    status: "pending", // Still waiting for John
    createdAt: "2024-02-01T10:00:00.000Z"
  },
  {
    _id: "inv_out_2",
    roomId: { _id: "r1", roomName: "React Devs ⚛️" },
    receiverEmail: "alice@tech.com",
    status: "accepted", // Alice joined
    createdAt: "2024-01-20T12:00:00.000Z"
  },
  {
    _id: "inv_out_3",
    roomId: { _id: "r3", roomName: "My Private Project" },
    receiverEmail: "spammer@bad.com",
    status: "rejected", // They said no
    createdAt: "2024-01-15T09:30:00.000Z"
  }
];

const UserInvite = () => {
  const [activeTab, setActiveTab] = useState('received'); // 'received' | 'sent'
  const [receivedInvites, setReceivedInvites] = useState(MOCK_RECEIVED);
  const [sentInvites, setSentInvites] = useState(MOCK_SENT);

  // --- ACTIONS ---

  // 1. Handle Incoming (Accept/Reject)
  const handleIncomingResponse = (id, newStatus) => {
    // API Call would go here
    setReceivedInvites(prev => prev.map(inv => 
      inv._id === id ? { ...inv, status: newStatus } : inv
    ));
  };

  // 2. Handle Outgoing (Revoke/Cancel)
  const handleRevokeInvite = (id) => {
    if(window.confirm("Are you sure you want to cancel this invitation?")) {
        // API Call to delete invitation
        setSentInvites(prev => prev.filter(inv => inv._id !== id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short", day: "numeric"
    });
  };

  // Helper for status badges
  const getStatusBadge = (status) => {
    switch(status) {
        case 'pending': 
            return <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
        case 'accepted': 
            return <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Check className="w-3 h-3" /> Accepted</span>;
        case 'rejected': 
            return <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><X className="w-3 h-3" /> Rejected</span>;
        default: return null;
    }
  };

  return (
    <div className='bg-gray-50'>
        <div className='max-w-7xl mx-auto p-4'>
            
            {/* --- HEADER --- */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Invitations</h1>
                <p className="text-gray-500 mt-1">Manage incoming requests and track invites you've sent.</p>
            </div>

            {/* --- TABS --- */}
            <div className="flex p-1 bg-white rounded-xl border border-gray-200 w-fit mb-6 shadow-sm">
                <button 
                    onClick={() => setActiveTab('received')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'received' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <Inbox className="w-4 h-4" /> Received
                    {receivedInvites.filter(i => i.status === 'pending').length > 0 && (
                        <span className="bg-white/20 text-white px-1.5 rounded text-xs ml-1">
                            {receivedInvites.filter(i => i.status === 'pending').length}
                        </span>
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab('sent')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'sent' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <Send className="w-4 h-4" /> Sent
                </button>
            </div>

            {/* --- LIST CONTAINER --- */}
            <div className='space-y-4'>

                {/* === VIEW 1: RECEIVED INVITATIONS === */}
                {activeTab === 'received' && (
                    <>
                        {receivedInvites.length === 0 && <EmptyState text="No received invitations" />}
                        {receivedInvites.map((invite) => (
                            <div key={invite._id} className="bg-white rounded-xl border border-blue-100 p-5 shadow-sm hover:shadow-md transition-all">
                                <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-bold text-gray-900">{invite.roomId?.roomName}</h3>
                                            {getStatusBadge(invite.status)}
                                        </div>
                                        <p className="text-sm text-gray-600 flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" /> 
                                            Invited by <span className="font-semibold text-gray-900">{invite.senderId?.name}</span>
                                        </p>
                                    </div>

                                    {/* Actions for Received */}
                                    <div className="flex items-center gap-3">
                                        {invite.status === 'pending' ? (
                                            <>
                                                <button onClick={() => handleIncomingResponse(invite._id, 'rejected')} className="px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm font-medium transition-colors border border-gray-200">Decline</button>
                                                <button onClick={() => handleIncomingResponse(invite._id, 'accepted')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">Accept</button>
                                            </>
                                        ) : (
                                            <span className="text-sm text-gray-400 font-medium flex items-center gap-1">
                                                {invite.status === 'accepted' ? 'You joined this room' : 'You declined this'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {/* === VIEW 2: SENT INVITATIONS (What you asked for) === */}
                {activeTab === 'sent' && (
                    <>
                        {sentInvites.length === 0 && <EmptyState text="You haven't sent any invitations" />}
                        {sentInvites.map((invite) => (
                            <div key={invite._id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-all opacity-95">
                                <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-bold text-gray-900">{invite.roomId?.roomName}</h3>
                                            {getStatusBadge(invite.status)}
                                        </div>
                                        <p className="text-sm text-gray-600 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" /> 
                                            Sent to: <span className="font-semibold text-gray-900">{invite.receiverEmail}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1 pl-6">
                                            Sent on {formatDate(invite.createdAt)}
                                        </p>
                                    </div>

                                    {/* Actions for Sent */}
                                    <div className="flex items-center">
                                        {invite.status === 'pending' ? (
                                            <button 
                                                onClick={() => handleRevokeInvite(invite._id)}
                                                className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" /> Revoke Invite
                                            </button>
                                        ) : (
                                            <div className="text-sm text-gray-400 font-medium px-3">
                                                {invite.status === 'accepted' ? 'User has joined' : 'User rejected'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

            </div>
        </div>
    </div>
  )
}

// Simple Sub-component for Empty States
const EmptyState = ({ text }) => (
    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
        <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">{text}</p>
    </div>
);

export default UserInvite;