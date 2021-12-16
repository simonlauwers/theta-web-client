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

interface FortifyControlProps {
    setGame : React.Dispatch<React.SetStateAction<GameType | null>>;
    setError : React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
}

const FortifyControl = (fortifyControlProps : FortifyControlProps) => {
    const { meta } = useGame();
    const { currentPlayer } = usePlayer();
    const { selectedTerritory, outgoingSelectedTerritory, incomingSelectedTerritory, 
        setSelectedTerritory, setOutgoingSelectedTerritory, setIncomingSelectedTerritory } = useTerritory();
    const [ troops, setTroops] = useState<number>(1);
    const [ availableTroops, setAvailableTroops ] = useState<number>(1);
    
    const { mutate, isLoading } = useMutation(gameApi.fortify, {
		onSuccess: (data: GameType) => {
			fortifyControlProps.setGame(data);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			fortifyControlProps.setError(rmt);
		}
	});

    const fortify = () => {
        mutate({gameId: meta?.uuid!, outgoingTerritoryId: outgoingSelectedTerritory?.uuid!, 
            incomingTerritoryId: incomingSelectedTerritory?.uuid!, troops});
            setOutgoingSelectedTerritory(null);
            setIncomingSelectedTerritory(null);
    };

    const skip = () => {
        mutate({gameId: meta?.uuid!, outgoingTerritoryId: "", 
            incomingTerritoryId: "", troops: 0});
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
            } else if (outgoingSelectedTerritory === null && gameUtils.validatePlayerTerritory(currentPlayer!, selectedTerritory!)){
                const territoryTroops = gameUtils.getAvailableTroops(currentPlayer!, selectedTerritory!) - 1;
                if (territoryTroops > 0) {
                    setOutgoingSelectedTerritory(selectedTerritory);
                    setAvailableTroops(territoryTroops);
                    setSelectedTerritory(null);
                }
            } else if (gameUtils.validatePlayerTerritory(currentPlayer!, selectedTerritory!)) {
                setIncomingSelectedTerritory(selectedTerritory);
                setSelectedTerritory(null);
            }
        }
    }, [selectedTerritory]); 

    if (isLoading) {
        return (
            <div>
                Fortifying
            </div>
        );
    }

    return (
        <div>
            {outgoingSelectedTerritory !== null && 
            <div>
                Outgoing Territory selected : {outgoingSelectedTerritory?.name} <br/>
                {incomingSelectedTerritory !== null &&  
                <>
                    Incomming Territory selected : {incomingSelectedTerritory?.name} <br/>

                    <Slider min={1} max={availableTroops} defaultValue={1} aria-label="Default" valueLabelDisplay="auto" 
                    onChange={(e, val) => {setTroops(val as number);}}/>

                    <button onClick={fortify}>Fortify</button>
                </>
                }
            </div>}
            <button onClick={skip}>Next Phase</button>
        </div>
    );
};

export default FortifyControl;