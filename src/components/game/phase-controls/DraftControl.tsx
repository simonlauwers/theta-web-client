/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import useGame from "../../../hooks/context-hooks/game/UseGame";
import usePlayer from "../../../hooks/context-hooks/game/UsePlayer";
import useTerritory from "../../../hooks/context-hooks/game/UseTerritory";
import GameType from "../../../types/Game/GameType";
import PlayerType from "../../../types/Game/PlayerType";
import TerritoryType from "../../../types/Game/TerritoryType";
import * as gameApi from "../../../api/game/GameApi";
import ResponseMessageType from "../../../types/ResponseMessageType";
import { useMutation } from "react-query";

interface DraftControlProps {
    setGame : React.Dispatch<React.SetStateAction<GameType | null>>;
}

const DraftControl = (draftControlProps : DraftControlProps) => {
    const { meta } = useGame();
    const { currentPlayer } = usePlayer();
    const { selectedTerritory, outgoingSelectedTerritory, setSelectedTerritory, setOutgoingSelectedTerritory } = useTerritory();
    const [ error, setError] = useState<ResponseMessageType | null>(null);
    const [ troops, setTroops] = useState<number>(1);

    const { mutate, isLoading } = useMutation(gameApi.draft, {
		onSuccess: (data: GameType) => {
			draftControlProps.setGame(data);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			setError(rmt);
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
            } else if (validatePlayerTerritory(currentPlayer!, selectedTerritory!)){
                setOutgoingSelectedTerritory(selectedTerritory);
                setSelectedTerritory(null);
            }
        }
    }, [selectedTerritory]); 

    return (
        <div>
            Troops left : { currentPlayer?.troops } <br/>

            Territory selected : {outgoingSelectedTerritory?.name} <br/>

            Assign amount of troops : <input onChange={(event) => {setTroops(parseInt(event.target.value));}}
            type={"number"} min={1} max={currentPlayer?.troops} defaultValue={1}/> <br/>

            <button onClick={draft}>Draft</button>
        </div>
    );
};

export default DraftControl;

function validatePlayerTerritory(player : PlayerType, territory : TerritoryType) {
    return player.playerTerritories.filter(pt => pt.territory.uuid === territory.uuid).length > 0;
}