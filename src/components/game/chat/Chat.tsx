import React, { useEffect, useContext, useState, useCallback } from "react";
import WhiteTextField from "../../theme/formInputs/WhiteTextField";
import { SocketContext } from "../../../contexts/ChatContext";
import useAuth from "../../../hooks/context-hooks/UseAuth";
import axios from "axios";
import { useFormik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router";
import "./Chat.css";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { Message } from "./Message";
import MessageType from "../../../types/MessageType";
import usePlayer from "../../../hooks/context-hooks/game/UsePlayer";

interface MessageValues {
    message: string
}


const Chat = () => {
    console.log("chat rerender");
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
            console.log(message.message);
            sendMessage(message.message, gameId!);
        },
    });

    const handleInviteAccepted = useCallback(() => {
        setJoined(true);
    }, []);

    const handleJoinChat = useCallback(() => {
        axios.post("http://localhost:3001/api/chat/user/link", {
            socketId: socket.id
        }, {
            headers: {
                "x-authentication-id": user!.userId
            }
        }).then(() => {
            // game id hier
            socket.emit("request/room/join", "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6");
        });

    }, []);

    const sendMessage = (message: string, gameId: string) => {
        socket.emit("request/room/messages/new", {
            text: message,
            roomId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6",
        });
    };


    useEffect(() => {
        handleJoinChat();
        // subscribe to socket events
        socket.on("response/room/join", (room) => {
            console.log(room);
            socket.emit("request/room/messages", room.id);
        });

        socket.on("response/room/messages", (messages) => {
            // Recieve all messages
            setMessages(messages);
            console.log("messages updated");
        });

        socket.on("response/message", (message) => {
            // Single message append
            console.log("new message");
            console.log(message);
        });

        socket.on("error", (message: string) => {
            console.log(message);
        });


        return () => {
            // before the component is destroyed
            // unbind all event handlers used in this component
            socket.off("JOIN_REQUEST_ACCEPTED", handleInviteAccepted);
        };
    }, [socket]);

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
                <div className="msg left-msg">
                    <div
                        className="msg-img"
                        style={{ backgroundImage: "url(url(https://image.flaticon.com/icons/svg/327/327779.svg)" }}
                    ></div>

                    <div className="msg-bubble">
                        <div className="msg-info">
                            <div className="msg-info-name">BOT</div>
                            <div className="msg-info-time">12:45</div>
                        </div>

                        <div className="msg-text">
                            Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
                        </div>
                    </div>
                </div>
                {messages.map((msg) => {
                    return (<Message
                        message={msg.message}
                        avatar=""
                        displayName=""
                        sentAt="13:39h"
                        key={msg.id}
                        sentByMe={false} />);
                })}
            </main>

            <form className="msger-inputarea" onSubmit={formik.handleSubmit}>
                <input type="text" id="message" name="message" value={formik.values.message}
                    onChange={formik.handleChange} className="msger-input" placeholder="Enter your message..." />
                <button type="submit" className="msger-send-btn">Send</button>
            </form>
        </section >
    );
};

export { Chat };