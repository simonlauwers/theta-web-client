/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import useGame from "../../../hooks/context-hooks/game/UseGame";
import usePhase from "../../../hooks/context-hooks/game/UsePhase";
import ResponseMessageType from "../../../types/ResponseMessageType";
import * as gameApi from "../../../api/game/GameApi";

interface AiControlProps {
    setError : React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
}

const AiControl = (aiControlProps : AiControlProps) => {
    const { meta } = useGame();
    const { phase } = usePhase();
    const [ lastPhase, setLastPhase ] = useState<string>("NONE");

    const { mutate, isLoading } = useMutation(gameApi.callAi, {
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			aiControlProps.setError(rmt);
		}
	});

    useEffect(() => {

        if(!isLoading && lastPhase !== phase) {
            mutate({uuid : meta!.uuid, phase : phase});
            setLastPhase(phase);
        }

    }, [phase, isLoading, lastPhase]);

    return (
        <></>
    );
};

export default AiControl;