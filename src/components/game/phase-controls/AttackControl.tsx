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
import { Slider } from "@mui/material";

interface AttackControlProps {
    setGame : React.Dispatch<React.SetStateAction<GameType | null>>;
    setError : React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
}

const AttackControl = (attackControlProps : AttackControlProps) => {
    const { meta } = useGame();
    const { currentPlayer } = usePlayer();
    const { selectedTerritory, outgoingSelectedTerritory, incomingSelectedTerritory, 
        setSelectedTerritory, setOutgoingSelectedTerritory, setIncomingSelectedTerritory } = useTerritory();
    const [ troops, setTroops] = useState<number>(1);
    const [ availableTroops, setAvailableTroops ] = useState<number>(1);

    const { mutate, isLoading } = useMutation(gameApi.attack, {
		onSuccess: (data: GameType) => {
			attackControlProps.setGame(data);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			attackControlProps.setError(rmt);
		}
	});

    const attack = () => {
        mutate({gameId: meta?.uuid!, attackerTerritoryId: outgoingSelectedTerritory?.uuid!, 
            defenderTerritoryId: incomingSelectedTerritory?.uuid!, troops});
            setOutgoingSelectedTerritory(null);
            setIncomingSelectedTerritory(null);
    };

    const skip = () => {
        mutate({gameId: meta?.uuid!, attackerTerritoryId: "", 
            defenderTerritoryId: "", troops: 0});
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
                const territoryTroops = getAvailableTroops(currentPlayer!, selectedTerritory!) - 1;
                if (territoryTroops > 0) {
                    setOutgoingSelectedTerritory(selectedTerritory);
                    setAvailableTroops(territoryTroops);
                    setIncomingSelectedTerritory(null);
                    setSelectedTerritory(null);
                }
            } else if (outgoingSelectedTerritory !== null && validateBorder(outgoingSelectedTerritory, selectedTerritory)) {
                setIncomingSelectedTerritory(selectedTerritory);
                setSelectedTerritory(null);
            }
        }
    }, [selectedTerritory]); 

    if (isLoading) {
        return (
            <div>
                Attacking
            </div>
        );
    }

    return (
        <div>
            {outgoingSelectedTerritory !== null && 
            <div>
                Player Territory selected : {outgoingSelectedTerritory?.name} <br/>
                {incomingSelectedTerritory !== null &&  
                <>
                    Enemy Territory selected : {incomingSelectedTerritory?.name} <br/>

                    <Slider min={1} max={availableTroops > 3 ? 3 : availableTroops} defaultValue={1} aria-label="Default" valueLabelDisplay="auto" 
                    onChange={(e, val) => {setTroops(val as number);}}/>

                    <button onClick={attack}>Attack</button>
                </>
                }
            </div>}
            <button onClick={skip}>Next Phase</button>
        </div>

        
    );
};

export default AttackControl;

function validatePlayerTerritory(player : PlayerType, territory : TerritoryType) {
    return player.playerTerritories.filter(pt => pt.territory.uuid === territory.uuid).length > 0;
}

function validateBorder(outgoingTerritory : TerritoryType, incommingTerritory : TerritoryType) {
    return outgoingTerritory.territoryBorders.filter(tb => tb.borderingTerritory.uuid === incommingTerritory.uuid).length > 0;
}

function getAvailableTroops(player : PlayerType, territory : TerritoryType) {
    return player.playerTerritories.filter(pt => pt.territory.uuid === territory.uuid)[0].troops;
}