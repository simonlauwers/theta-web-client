import socketio, { Socket } from "socket.io-client";
import React, { createContext } from "react";


export const socket = socketio(process.env.REACT_APP_SOCKET_URL as string);
export const SocketContext = createContext<Socket>({} as Socket);