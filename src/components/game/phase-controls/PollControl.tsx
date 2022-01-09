/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import useGame from "../../../hooks/context-hooks/game/UseGame";
import * as gameApi from "../../../api/game/GameApi";
import { useQuery } from "react-query";
import GameType from "../../../types/game/GameType";
import usePhase from "../../../hooks/context-hooks/game/UsePhase";
import ResponseMessageType from "../../../types/ResponseMessageType";

interface PollControlProps {
    setGame: React.Dispatch<React.SetStateAction<GameType | null>>;
    setError: React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
}

const PollControl = (pollControlProps: PollControlProps) => {
    const { meta } = useGame();
    const { lastUpdate } = usePhase();

    useQuery(
        "pollGame",
        async () => {
            try {
                const data = await gameApi.pollGame({ uuid: meta!.uuid, lastUpdate: lastUpdate });
                if (data.status === 202) {
                    pollControlProps.setGame(data.data);
                }
            } catch (error) {
                const data = error as any;
                const rmt = data.response.data as ResponseMessageType;
                console.log(rmt);
                pollControlProps.setError(rmt);
            }

        },
        {
            refetchInterval: 1000,
        }
    );

    return (
        <></>
    );
};

export default PollControl;