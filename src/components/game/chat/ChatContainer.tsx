import React from "react";
import useGame from "../../../hooks/context-hooks/game/UseGame";
import { Chat } from "./Chat";

export const ChatContainer = () => {
    const { meta } = useGame();
    return (
        <>
            {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                meta!.gameMode.toUpperCase() !== "SINGLE" &&
                <div style={{ position: "fixed", height: "35vh", width: "35vh", bottom: 0, right: "5vh" }}>
                    <Chat />
                </div>
            }
        </>
    );
};
