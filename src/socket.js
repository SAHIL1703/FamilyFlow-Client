import { io } from "socket.io-client";

// Connect once and export this single instance
// Replace with your backend URL
export const socket = io("https://familyflow-kun4.onrender.com", {
  autoConnect: true,
  reconnection: true,
});