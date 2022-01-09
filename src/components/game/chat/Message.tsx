import React from "react";

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
