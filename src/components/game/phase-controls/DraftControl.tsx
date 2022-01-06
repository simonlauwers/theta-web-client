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
import { Slider, Typography } from "@mui/material";
import * as gameUtils from "../../../utils/game/GameUtils";

interface DraftControlProps {
    setGame : React.Dispatch<React.SetStateAction<GameType | null>>;
    setError : React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
    setAllowAction : React.Dispatch<React.SetStateAction<boolean>>;
    fireAction : boolean;
    next: boolean;
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
        setTroops(1);
        setOutgoingSelectedTerritory(null);
    };

    const skip = () => {
        mutate({gameId: meta?.uuid!, territoryId: currentPlayer!.playerTerritories[0].territory.uuid, troops: currentPlayer!.troops});
        setTroops(1);
        setOutgoingSelectedTerritory(null);
    };

    useEffect(() => {
        if(draftControlProps.fireAction) {
            draft();
        }
    }, [draftControlProps.fireAction]);

    useEffect(() => {
        if(draftControlProps.next && !isLoading) {
            skip();
        }
    }, [draftControlProps.next, isLoading]);

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

    useEffect(() => {
        if(outgoingSelectedTerritory !== null) {
            draftControlProps.setAllowAction(true);
        } else {
            draftControlProps.setAllowAction(false);
        }
    }, [outgoingSelectedTerritory]);

    if (isLoading) {
        return (
            <div style={{display: "flex", width: "100%", alignItems:"center"}}>
                <Typography color="ghostwhite" variant="h4">
                    Drafting
                </Typography>
            </div>
        );
    }

    return (
        <div style={{width: "100%"}}>
            {outgoingSelectedTerritory !== null ? 
                <div style={{display: "flex", width: "100%", alignItems:"center"}}>
                    <div style={{display: "flex", width: "25%", alignItems:"center", justifyContent:"center"}}>
                        <Typography color="ghostwhite" variant="h4">
                            {troops}
                        </Typography>
                    </div>
                    <div style={{display: "flex", width: "75%", marginLeft:"5%", marginRight:"5%", alignItems:"center"}}>
                        <Slider min={1} max={currentPlayer?.troops} defaultValue={1} aria-label="Default"
                        onChange={(e, val) => {setTroops(val as number);}}/>
                    </div>
                </div>
            :
                <div style={{display: "flex", width: "100%", alignItems:"center"}}>
                    <Typography color="ghostwhite" variant="h4">
                        You have {currentPlayer?.troops} {currentPlayer!.troops > 1? "troops" : "troop"} available.
                    </Typography>
                </div>
            }
        </div>
    );
};

export default DraftControl;