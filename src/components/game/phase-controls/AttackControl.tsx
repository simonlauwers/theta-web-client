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

interface AttackControlProps {
    setGame : React.Dispatch<React.SetStateAction<GameType | null>>;
}

const AttackControl = (attackControlProps : AttackControlProps) => {
    const { meta } = useGame();
    const { currentPlayer } = usePlayer();
    const { selectedTerritory, outgoingSelectedTerritory, incomingSelectedTerritory, 
        setSelectedTerritory, setOutgoingSelectedTerritory, setIncomingSelectedTerritory } = useTerritory();
    const [ error, setError] = useState<ResponseMessageType | null>(null);
    const [ troops, setTroops] = useState<number>(1);

    const { mutate, isLoading } = useMutation(gameApi.attack, {
		onSuccess: (data: GameType) => {
			attackControlProps.setGame(data);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			setError(rmt);
		}
	});

    const attack = () => {
        mutate({gameId: meta?.uuid!, attackerTerritoryId: outgoingSelectedTerritory?.uuid!, 
            defenderTerritoryId: incomingSelectedTerritory?.uuid!, troops});
            setOutgoingSelectedTerritory(null);
            setIncomingSelectedTerritory(null);
    };

    useEffect(() => {
        if (selectedTerritory !== null) {
            if (selectedTerritory?.uuid === outgoingSelectedTerritory?.uuid) {
                setOutgoingSelectedTerritory(null);
                setIncomingSelectedTerritory(null);
                setSelectedTerritory(null);
            } else if (selectedTerritory?.uuid === incomingSelectedTerritory?.uuid) {
                setIncomingSelectedTerritory(null);
                setSelectedTerritory(null);
            } else if (validatePlayerTerritory(currentPlayer!, selectedTerritory!)){
                setOutgoingSelectedTerritory(selectedTerritory);
                setSelectedTerritory(null);
            } else if (outgoingSelectedTerritory !== null) {
                setIncomingSelectedTerritory(selectedTerritory);
                setSelectedTerritory(null);
            }
        }
    }, [selectedTerritory]); 

    return (
        <div>
            Player Territory selected : {outgoingSelectedTerritory?.name} <br/>
            Enemy Territory selected : {incomingSelectedTerritory?.name} <br/>

            Attack with amount of troops : <input onChange={(event) => {setTroops(parseInt(event.target.value));}}
            type={"number"} min={1} max={3} defaultValue={1}/> <br/>
    
            <button onClick={attack}>Attack</button>
        </div>
    );
};

export default AttackControl;

function validatePlayerTerritory(player : PlayerType, territory : TerritoryType) {
    return player.playerTerritories.filter(pt => pt.territory.uuid === territory.uuid).length > 0;
}