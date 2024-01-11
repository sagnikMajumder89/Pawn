import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "./socketContext";
import { UserDetailsContext } from "../components/Authentication/AuthRoute";

export const GameDataContext = createContext(null);

export const GameDataProvider = ({ children }) => {
  const { userDetails } = useContext(UserDetailsContext);
  const [gameData, setGameData] = useState(null);
  const { roomId } = useParams();
  const socket = useSocket();
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("gameFound", (data) => {
      console.log(data);
      setGameData(data);
      navigate(`/play/${data.roomId}`)
    })
    socket.emit("getGameData", { roomId, socketId: socket.id, userId: userDetails._id })
  }, [socket, roomId, userDetails._id, navigate]);

  return (
    <GameDataContext.Provider value={{ gameData, setGameData }}>
      {children}
    </GameDataContext.Provider>
  );
};
