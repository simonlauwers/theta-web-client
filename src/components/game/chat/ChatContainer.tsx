import React from "react";
import { Chat } from "./Chat";

export const ChatContainer = () => {
    return (
        <div style={{ position: "absolute", height: "35vh", width: "35vh", bottom: 0, left: 1600 }}>
            <Chat />
        </div>
    );
};
