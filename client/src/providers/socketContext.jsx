import React, { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SERVER_URL; // server endpoint
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);

    // Listen for the connect event to set isConnected to true
    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    setSocket(newSocket);

    // Clean up the socket connection and listeners
    return () => {
      newSocket.off("connect");
      newSocket.close();
    };
  }, []);

  // Render loading message if not connected or socket.id is undefined
  if (!isConnected || !socket || socket.id === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
