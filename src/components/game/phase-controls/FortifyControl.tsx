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
import { Button, Slider, Typography } from "@mui/material";
import * as gameUtils from "../../../utils/game/GameUtils";

interface FortifyControlProps {
    setGame: React.Dispatch<React.SetStateAction<GameType | null>>;
    setError: React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
    setAllowAction: React.Dispatch<React.SetStateAction<boolean>>;
    fireAction: boolean;
    next: boolean;
}

const FortifyControl = (fortifyControlProps: FortifyControlProps) => {
    const { meta } = useGame();
    const { currentPlayer } = usePlayer();
    const { selectedTerritory, outgoingSelectedTerritory, incomingSelectedTerritory,
        setSelectedTerritory, setOutgoingSelectedTerritory, setIncomingSelectedTerritory } = useTerritory();
    const [troops, setTroops] = useState<number>(1);
    const [availableTroops, setAvailableTroops] = useState<number>(1);

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
        mutate({
            gameId: meta?.uuid!, outgoingTerritoryId: outgoingSelectedTerritory?.uuid!,
            incomingTerritoryId: incomingSelectedTerritory?.uuid!, troops
        });
        setOutgoingSelectedTerritory(null);
        setIncomingSelectedTerritory(null);
    };

    const skip = () => {
        mutate({
            gameId: meta?.uuid!, outgoingTerritoryId: "",
            incomingTerritoryId: "", troops: 0
        });
        setOutgoingSelectedTerritory(null);
        setIncomingSelectedTerritory(null);
    };

    useEffect(() => {
        if (fortifyControlProps.fireAction) {
            fortify();
        }
    }, [fortifyControlProps.fireAction]);

    useEffect(() => {
        if (fortifyControlProps.next && !isLoading) {
            skip();
        }
    }, [fortifyControlProps.next, isLoading]);

    useEffect(() => {
        if (selectedTerritory !== null) {
            if (selectedTerritory?.uuid === outgoingSelectedTerritory?.uuid) {
                setOutgoingSelectedTerritory(null);
                setIncomingSelectedTerritory(null);
                setSelectedTerritory(null);
            } else if (selectedTerritory?.uuid === incomingSelectedTerritory?.uuid) {
                setIncomingSelectedTerritory(null);
                setSelectedTerritory(null);
            } else if (outgoingSelectedTerritory === null && gameUtils.validatePlayerTerritory(currentPlayer!, selectedTerritory!)) {
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

    useEffect(() => {
        if (outgoingSelectedTerritory !== null && incomingSelectedTerritory !== null) {
            fortifyControlProps.setAllowAction(true);
        } else {
            fortifyControlProps.setAllowAction(false);
        }
    }, [outgoingSelectedTerritory, incomingSelectedTerritory]);

    if (isLoading) {
        return (
            <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                <Typography color="ghostwhite" variant="h4">
                    Fortifying
                </Typography>
            </div>
        );
    }

    return (
        <div style={{ width: "100%" }}>
            {outgoingSelectedTerritory !== null ?
                <div style={{ width: "100%" }}>
                    {incomingSelectedTerritory !== null ?
                        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                            <div style={{ display: "flex", width: "25%", alignItems: "center", justifyContent: "center" }}>
                                <Typography color="ghostwhite" variant="h4">
                                    {troops}
                                </Typography>
                            </div>
                            <div style={{ display: "flex", width: "75%", marginLeft: "5%", marginRight: "5%", alignItems: "center" }}>
                                <Slider min={1} max={availableTroops} defaultValue={1} aria-label="Default"
                                    onChange={(e, val) => { setTroops(val as number); }} color="secondary" />
                            </div>
                        </div>
                        :
                        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                            <Typography color="ghostwhite" variant="h4" sx={{ width: "100%" }}>
                                Fortifying from {outgoingSelectedTerritory.name}
                            </Typography>
                        </div>
                    }
                </div>
                :
                <div style={{ display: "flex", width: "100%", alignItems: "center", flexWrap: "wrap" }}>
                    <Typography color="ghostwhite" variant="h4" sx={{ width: "100%" }}>
                        Select a territory to fortify...
                    </Typography>
                    <Button variant="contained" onClick={skip} sx={{ backgroundColor: "ghostwhite", color: "#141124", fontWeight: "bold", width: "50%", marginTop: "0.5rem" }}>
                        End turn
                    </Button>
                </div>
            }
        </div>
    );
};

export default FortifyControl;
