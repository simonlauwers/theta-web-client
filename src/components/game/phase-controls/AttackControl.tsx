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
import useDice from "../../../hooks/context-hooks/game/UseDice";

interface AttackControlProps {
    setGame: React.Dispatch<React.SetStateAction<GameType | null>>;
    setError: React.Dispatch<React.SetStateAction<ResponseMessageType | null>>;
    setAllowAction: React.Dispatch<React.SetStateAction<boolean>>;
    fireAction: boolean;
    next: boolean;
}

const AttackControl = (attackControlProps: AttackControlProps) => {
    const { meta } = useGame();
    const { currentPlayer } = usePlayer();
    const { selectedTerritory, outgoingSelectedTerritory, incomingSelectedTerritory,
        setSelectedTerritory, setOutgoingSelectedTerritory, setIncomingSelectedTerritory } = useTerritory();
    const { setAttackerRoll, setDefenderRoll, setShowingRoll } = useDice();
    const [troops, setTroops] = useState<number>(1);
    const [availableTroops, setAvailableTroops] = useState<number>(1);
    const [isLoading, setIsloading] = useState(false);

    const { mutate } = useMutation(gameApi.attack, {
        onSuccess: (data: GameType) => {
            setAttackerRoll(data.lastRoll.attackerResult);
            setDefenderRoll(data.lastRoll.defenderResult);
            if (data.gamePhase === "ATTACK") {
                setShowingRoll(true);
                setTimeout(() => {
                    attackControlProps.setGame(data);
                    setIsloading(false);
                }, 2500);
            } else {
                attackControlProps.setGame(data);
                setIsloading(false);
            }
        },
        onError: (e: any) => {
            const rmt = e.response.data as ResponseMessageType;
            console.log(rmt);
            attackControlProps.setError(rmt);
            setIsloading(false);
        }
    });

    const attack = () => {
        mutate({
            gameId: meta?.uuid!, attackerTerritoryId: outgoingSelectedTerritory?.uuid!,
            defenderTerritoryId: incomingSelectedTerritory?.uuid!, troops
        });
        setOutgoingSelectedTerritory(null);
        setIncomingSelectedTerritory(null);
        setTroops(1);
        setIsloading(true);
    };

    const skip = () => {
        mutate({
            gameId: meta?.uuid!, attackerTerritoryId: "",
            defenderTerritoryId: "", troops: 0
        });
        setOutgoingSelectedTerritory(null);
        setIncomingSelectedTerritory(null);
        setIsloading(true);
    };

    useEffect(() => {
        if (attackControlProps.fireAction) {
            attack();
        }
    }, [attackControlProps.fireAction]);

    useEffect(() => {
        if (attackControlProps.next && !isLoading) {
            skip();
        }
    }, [attackControlProps.next, isLoading]);

    useEffect(() => {
        if (selectedTerritory !== null) {
            if (selectedTerritory?.uuid === outgoingSelectedTerritory?.uuid) {
                setOutgoingSelectedTerritory(null);
                setIncomingSelectedTerritory(null);
                setSelectedTerritory(null);
            } else if (selectedTerritory?.uuid === incomingSelectedTerritory?.uuid) {
                setIncomingSelectedTerritory(null);
                setSelectedTerritory(null);
            } else if (gameUtils.validatePlayerTerritory(currentPlayer!, selectedTerritory!)) {
                const territoryTroops = gameUtils.getAvailableTroops(currentPlayer!, selectedTerritory!) - 1;
                if (territoryTroops > 0) {
                    setOutgoingSelectedTerritory(selectedTerritory);
                    setAvailableTroops(territoryTroops);
                    setIncomingSelectedTerritory(null);
                    setSelectedTerritory(null);
                }
            } else if (outgoingSelectedTerritory !== null && gameUtils.validateBorder(outgoingSelectedTerritory, selectedTerritory)) {
                setIncomingSelectedTerritory(selectedTerritory);
                setSelectedTerritory(null);
            }
        }
    }, [selectedTerritory]);



    useEffect(() => {
        if (outgoingSelectedTerritory !== null && incomingSelectedTerritory !== null) {
            attackControlProps.setAllowAction(true);
        } else {
            attackControlProps.setAllowAction(false);
        }
    }, [outgoingSelectedTerritory, incomingSelectedTerritory]);

    if (isLoading) {
        return (
            <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                <Typography color="ghostwhite" variant="h4">
                    Attacking
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
                                <Slider min={1} max={availableTroops > 3 ? 3 : availableTroops} defaultValue={1} aria-label="Default"
                                    onChange={(e, val) => { setTroops(val as number); }} color="secondary" />
                            </div>
                        </div>
                        :
                        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
                            <Typography color="ghostwhite" variant="h4" sx={{ width: "100%" }}>
                                Attacking from {outgoingSelectedTerritory.name}
                            </Typography>
                        </div>
                    }
                </div>
                :
                <div style={{ display: "flex", width: "100%", alignItems: "center", flexWrap: "wrap" }}>
                    <Typography color="ghostwhite" variant="h4" sx={{ width: "100%" }}>
                        Select a territory to attack...
                    </Typography>
                    <Button variant="contained" onClick={skip} sx={{ backgroundColor: "ghostwhite", color: "#141124", fontWeight: "bold", width: "50%", marginTop: "0.5rem" }}>
                        Next phase
                    </Button>
                </div>
            }
        </div>


    );
};

export default AttackControl;