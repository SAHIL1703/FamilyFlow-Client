import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const LinkDevicePage = () => {
  const { user, loadUser } = useContext(AppContext);
  const [macAddress, setMacAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLinkDevice = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:3000/api/auth/link-device",
        { macAddress: macAddress.toUpperCase().trim() },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("✅ Device linked successfully!");
      setMacAddress("");

      // Refresh user context so it knows about the new device
      if (loadUser) await loadUser();
    } catch (error) {
      console.error("Link Error:", error);
      toast.error(
        `❌ ${error.response?.data?.error || "Failed to link device"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
        paddingTop: "100px",
      }}
    >
      <h2>Connect Hardware Sensor</h2>
      <p>Enter the 12-character MAC address found on your ESP32 device.</p>

      {user?.deviceMac && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#e6ffe6",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <strong>Currently Linked Device:</strong> {user.deviceMac}
        </div>
      )}

      <form
        onSubmit={handleLinkDevice}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          placeholder="e.g., 24:6F:28:AB:CD:EF"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
          required
          style={{
            padding: "12px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Connecting..." : "Link Device"}
        </button>
      </form>
    </div>
  );
};

export default LinkDevicePage;
