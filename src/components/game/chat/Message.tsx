import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";
import { Avatar } from "@mui/material";
import MessageType from "../../../types/MessageType";
import { display } from "@mui/system";

interface Message {
    message: string,
    displayName: string,
    avatar: string,
    sentAt: string,
    sentByMe: boolean
}
export const Message = ({ message, displayName, avatar, sentAt, sentByMe }: Message) => {
    return (
        <div className={`msg ${sentByMe ? "right-msg" : "left-msg"}`}>
            <div
                className="msg-img"
                style={{ backgroundImage: `url(${avatar})` }}
            ></div>

            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{displayName}</div>
                    <div className="msg-info-time">{sentAt}</div>
                </div>

                <div className="msg-text">
                    {message}
                </div>
            </div>
        </div>
    );
};
