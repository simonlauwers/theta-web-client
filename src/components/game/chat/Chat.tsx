/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useContext, useState, useCallback } from "react";
import { SocketContext } from "../../../contexts/ChatContext";
import useAuth from "../../../hooks/context-hooks/UseAuth";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router";
import "./Chat.css";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { Message } from "./Message";
import MessageType from "../../../types/MessageType";
import { useMutation } from "react-query";

interface MessageValues {
    message: string
};

const players = [
    "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1",
    "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2"
];

const Chat = () => {
    const [hide, setHide] = useState<boolean>(false);
    const socket = useContext(SocketContext);
    const [joined, setJoined] = useState(false);
    const { user } = useAuth();
    const { gameId } = useParams();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const formik = useFormik({
        initialValues: {
            message: "",
        },
        onSubmit: async (message: MessageValues) => {
            // do call
            sendMessage(message.message, gameId!);
            formik.values.message = "";
        },
    });

    const getAllMessages = () => {
        socket.emit("request/room/messages", gameId);
    };

    const handleJoinChat = useCallback(() => {
        axios.post(process.env.REACT_APP_SOCKET_URL! + "api/chat/user/link", {
            socketId: socket.id
        }, {
            headers: {
                "x-authentication-id": user!.userId
            }
        }).then(() => {
            socket.emit("request/room/join", gameId);
        });
    }, []);

    const handleCreateRoom = async () => {
        await axios.post(process.env.REACT_APP_SOCKET_URL! + "api/chat/room", {
            id: gameId!,
            users: players
        });
    };

    const sendMessage = (message: string, gameId: string) => {
        socket.emit("request/room/messages/new", {
            text: message,
            roomId: gameId,
        });
    };

    console.log("message state in component: ");
    console.log(messages);

    useEffect(() => {
        handleJoinChat();
    }, []);

    socket.on("response/room/join", (room) => {
        console.log(room);
        socket.emit("request/room/messages", room.id);
    });

    socket.on("response/room/messages", (messages) => {
        // Recieve all messages
        console.log("all messages all");
        console.log(messages);
        setMessages(messages);
    });

    socket.on("response/message", (incomingMessage: MessageType) => {
        // Single message append

        if (messages.findIndex(e => incomingMessage.id === e.id) === -1) {
            const arr = messages;
            arr.push(incomingMessage);
            setMessages(arr);
        };

    });

    socket.on("error", (message: string) => {
        console.log(message);
    });


    const handleMinimize = () => {
        console.log("you clicked");
        setHide(!hide);
    };
    return (

        <section className="msger">
            <header className="msger-header">
                <div className="msger-header-title">
                    <ChatBubbleIcon />
                    <CloseFullscreenIcon onClick={handleMinimize} />
                </div>
                <div className="msger-header-options">
                    <span><i className="fas fa-cog"></i></span>
                </div>
            </header>

            <main className={hide ? "msger-chat hide" : "msger-chat"}>
                {messages.map((msg) => {
                    return (<Message
                        message={msg.message}
                        avatar={""}
                        displayName={""}
                        sentAt={`${new Date(msg.createdAt).getHours()}:${new Date(msg.createdAt).getMinutes()}`}
                        key={msg.id}
                        sentByMe={msg.UserId === user!.userId} />);
                })}
            </main>

            <form className="msger-inputarea" onSubmit={formik.handleSubmit}>
                <input type="text" id="message" name="message" value={formik.values.message}
                    onChange={formik.handleChange} autoComplete="off" className="msger-input" placeholder="Enter your message..." />
                <button type="submit" className="msger-send-btn">Send</button>
            </form>
        </section >
    );
};

export { Chat };