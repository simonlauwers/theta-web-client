import socketio, { Socket } from "socket.io-client";
import { createContext } from "react";


export const socket = socketio(location.hostname === "localhost" ? process.env.REACT_APP_SOCKET_URL as string : "https://theta-risk.com", {
    path: location.hostname === "localhost" ? "/socket.io/socket.io.js" : "/chat/socket.io/socket.io.js"
});
export const SocketContext = createContext<Socket>({} as Socket);