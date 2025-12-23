import { io } from "socket.io-client";

// Connect once and export this single instance
// Replace with your backend URL
export const socket = io("http://localhost:3000", {
  autoConnect: true,
  reconnection: true,
});