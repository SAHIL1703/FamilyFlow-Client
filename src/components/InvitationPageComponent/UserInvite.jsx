import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Mail, Check, X, Clock, User, Inbox, Send, Trash2,
} from "lucide-react";

const UserInvite = ({
  receivedInvites, // Data from parent (InvitationsPage)
  setReceivedInvites,
  sentInvites,
  setSentInvites,
}) => {
  const [activeTab, setActiveTab] = useState("received");

  // --- DYNAMIC ACTIONS ---

  // 1. Handle Incoming (Accept/Reject)
  const handleIncomingResponse = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `http://localhost:3000/api/invites/accept/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        // Update local state so UI changes immediately
        setReceivedInvites((prev) =>
          prev.map((inv) => (inv._id === id ? { ...inv, status: newStatus } : inv))
        );
        toast.success(`Invitation ${newStatus}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  // 2. Handle Outgoing (Revoke/Cancel)
  const handleRevokeInvite = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this invitation?")) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `http://localhost:3000/api/invites/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        // Remove from UI list
        setSentInvites((prev) => prev.filter((inv) => inv._id !== id));
        toast.success("Invitation revoked");
      }
    } catch (error) {
      toast.error("Failed to revoke invite");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      accepted: <Check className="w-3 h-3" />,
      rejected: <X className="w-3 h-3" />,
    };

    return (
      <span className={`${styles[status]} text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase`}>
        {icons[status]} {status}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 pt-10">
        {/* --- HEADER --- */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Invitations</h1>
          <p className="text-gray-500 mt-1">Manage incoming requests and track invites you've sent.</p>
        </div>

        {/* --- TABS --- */}
        <div className="flex p-1 bg-white rounded-xl border border-gray-200 w-fit mb-6 shadow-sm gap-2">
          <button
            onClick={() => setActiveTab("received")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "received" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Inbox className="w-4 h-4" /> Received
            {receivedInvites.filter((i) => i.status === "pending").length > 0 && (
              <span className="bg-red-500 text-white px-2 rounded-full text-[10px] ml-1">
                {receivedInvites.filter((i) => i.status === "pending").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "sent" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Send className="w-4 h-4" /> Sent
          </button>
        </div>

        {/* --- LIST --- */}
        <div className="space-y-4">
          {activeTab === "received" ? (
            receivedInvites.length === 0 ? <EmptyState text="No received invitations" /> : 
            receivedInvites.map((invite) => (
              <InviteCard 
                key={invite._id} 
                invite={invite} 
                isReceived={true} 
                onAction={handleIncomingResponse} 
                getStatusBadge={getStatusBadge}
                formatDate={formatDate}
              />
            ))
          ) : (
            sentInvites.length === 0 ? <EmptyState text="No sent invitations" /> : 
            sentInvites.map((invite) => (
              <InviteCard 
                key={invite._id} 
                invite={invite} 
                isReceived={false} 
                onAction={handleRevokeInvite} 
                getStatusBadge={getStatusBadge}
                formatDate={formatDate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const InviteCard = ({ invite, isReceived, onAction, getStatusBadge, formatDate }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all">
    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-lg font-bold text-gray-900">{invite.roomId?.roomName || "Unnamed Room"}</h3>
          {getStatusBadge(invite.status)}
        </div>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          {isReceived ? <User className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
          {isReceived ? `Invited by: ${invite.senderId?.name || 'Unknown'}` : `Sent to: ${invite.receiverEmail}`}
        </p>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
          {formatDate(invite.createdAt)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {invite.status === "pending" ? (
          isReceived ? (
            <>
              <button onClick={() => onAction(invite._id, "rejected")} className="px-4 py-2 text-gray-600 hover:bg-red-50 border rounded-lg text-sm font-medium">Decline</button>
              <button onClick={() => onAction(invite._id, "accepted")} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg">Accept</button>
            </>
          ) : (
            <button onClick={() => onAction(invite._id)} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50">
              <Trash2 className="w-4 h-4" /> Revoke
            </button>
          )
        ) : (
          <span className="text-sm text-gray-400 italic">
            {invite.status === "accepted" ? "Joined" : "Closed"}
          </span>
        )}
      </div>
    </div>
  </div>
);

const EmptyState = ({ text }) => (
  <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
    <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
    <p className="text-gray-500 font-medium">{text}</p>
  </div>
);

export default UserInvite;