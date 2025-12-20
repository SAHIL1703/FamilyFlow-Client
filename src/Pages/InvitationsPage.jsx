import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/NavbarComponent/Navbar.jsx";
import InviteDashboard from "../components/InvitationPageComponent/InviteDashboard.jsx";
import UserInvite from "../components/InvitationPageComponent/UserInvite.jsx";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const InvitationsPage = () => {
  // 1. 'sentInvites' for the Dashboard Stats
  const [sentInvites, setSentInvites] = useState([]);
  // 2. 'receivedInvites' for the Invitations List (Pending/Accepted/Rejected)
  const [receivedInvites, setReceivedInvites] = useState([]);
  const { user } = useContext(AppContext);

  // Derive stats for the Dashboard (Sent by the user)
  const calculateStats = () => {
    return {
      total: sentInvites.length,
      accepted: sentInvites.filter((i) => i.status === "accepted").length,
      pending: sentInvites.filter((i) => i.status === "pending").length,
      rejected: sentInvites.filter((i) => i.status === "rejected").length,
    };
  };

  // Fetch invites sent BY the user (for Stats)
  const fetchSentInvites = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/invites/sent/with-room",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setSentInvites(data.invites);
      }
    } catch (error) {
      console.error("Error fetching sent invites:", error);
    }
  };

  // Fetch invites sent TO the user (Incoming)
  const fetchReceivedInvites = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:3000/api/invites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        // Log 'data.invitations' here to see the result immediately!
        console.log("Received from API:", data.invitations);
        setReceivedInvites(data.invitations);
      }
    } catch (error) {
      console.error("Error fetching incoming invites:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSentInvites();
      fetchReceivedInvites();
    }
  }, [user]);

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Dashboard handles sending new invites and showing stats of sent ones */}
      <InviteDashboard 
        stats={stats} 
        refreshData={fetchSentInvites} 
      />

      {/* UserInvite handles the incoming invites (Accept/Decline) */}
      <UserInvite 
        receivedInvites={receivedInvites} 
        setReceivedInvites={setReceivedInvites}
        sentInvites={sentInvites}
        setSentInvites={setSentInvites}
        refreshSent={fetchSentInvites} // Useful if accepting an invite affects stats
      />
    </div>
  );
};

export default InvitationsPage;