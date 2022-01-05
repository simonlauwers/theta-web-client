/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as gameApi from "../../api/game/GameApi";
import useAuth from "../../hooks/UseAuth";
import GameType from "../../types/Game/GameType";

interface Player {
    aiPlayer: boolean,
    name: string,
    playerColor: string,
    uuid: string
};

export const Lobby = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [players, setPlayers] = useState<Player[]>([]);
    const [lastUpdate, setLastUpdate] = useState<string>();
    const { user } = useAuth();
    const { isLoading } = useQuery("getGame", () => gameApi.getGame(gameId!), {
        onSuccess: (data: GameType) => {
            console.log(data);
            setPlayers(data.players);
            setLastUpdate(data.updateTimestamp);
        }
    });

    useQuery(
        "pollGame",
        async () => {
            console.log("polling...");
            const data = await gameApi.pollGame({ uuid: gameId!, lastUpdate: lastUpdate! });
            if (data.status === 202) {
                setPlayers(data.data.players);
            } else if (data.status !== 204) {
                console.log("polling error occured");
            }
        },
        {
            refetchInterval: 1000,
        }
    );



    const { mutate: initGame } = useMutation(gameApi.initializeGame, {
        onSuccess: (data: GameType) => {
            navigate(`/game/${data.uuid}`);
        },
        onError: (e: any) => {
            console.log(e);
        }
    });

    const initializeGame = () => {
        initGame(gameId!);
    };

    return (
        isLoading ? <div>Loading... </div> :
            <div>
                {players.map(player => {
                    return (
                        <Card key={player.name} sx={{ mt: 2, mb: 2 }}>
                            <CardContent>
                                <Typography>
                                    {player.name}
                                </Typography>
                                <Typography>
                                    {player.playerColor}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
                <Button variant="contained" disabled={players.length < 2} onClick={() => initializeGame()}>Start game</Button>

            </div>
    );
};