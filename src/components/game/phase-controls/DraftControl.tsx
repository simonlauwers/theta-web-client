/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import useGame from "../../../hooks/context-hooks/game/UseGame";
import usePlayer from "../../../hooks/context-hooks/game/UsePlayer";
import useTerritory from "../../../hooks/context-hooks/game/UseTerritory";
import GameType from "../../../types/Game/GameType";
import * as gameApi from "../../../api/game/GameApi";
import ResponseMessageType from "../../../types/ResponseMessageType";
import { useMutation } from "react-query";
import { Slider } from "@mui/material";
import * as gameUtils from "../../../utils/game/GameUtils";

interface DraftControlProps {
    setGame : React.Dispatch<React.SetStateAction<GameType | null>>;
    setError : React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
}

const DraftControl = (draftControlProps : DraftControlProps) => {
    const { meta } = useGame();
    const { currentPlayer } = usePlayer();
    const { selectedTerritory, outgoingSelectedTerritory, setSelectedTerritory, setOutgoingSelectedTerritory } = useTerritory();
    const [ troops, setTroops] = useState<number>(1);

    const { mutate, isLoading } = useMutation(gameApi.draft, {
		onSuccess: (data: GameType) => {
			draftControlProps.setGame(data);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			draftControlProps.setError(rmt);
		}
	});

    const draft = () => {
        mutate({gameId: meta?.uuid!, territoryId: outgoingSelectedTerritory?.uuid!, troops});
        setOutgoingSelectedTerritory(null);
    };

    useEffect(() => {
        if (selectedTerritory !== null) {
            if (selectedTerritory?.uuid === outgoingSelectedTerritory?.uuid) {
                setOutgoingSelectedTerritory(null);
                setSelectedTerritory(null);
            } else if (gameUtils.validatePlayerTerritory(currentPlayer!, selectedTerritory!)){
                setOutgoingSelectedTerritory(selectedTerritory);
                setSelectedTerritory(null);
            }
        }
    }, [selectedTerritory]); 

    if (isLoading) {
        return (
            <div>
                Drafting
            </div>
        );
    }

    return (
        <div>
            Troops left : { currentPlayer?.troops } <br/>
            {outgoingSelectedTerritory !== null && 
            <div>
                Selected Territory : {outgoingSelectedTerritory.name} <br/>
                <Slider min={1} max={currentPlayer?.troops} defaultValue={1} aria-label="Default" valueLabelDisplay="auto" 
                onChange={(e, val) => {setTroops(val as number);}}/>
                <button onClick={draft}>Draft</button>
            </div>}


        </div>
    );
};

export default DraftControl;