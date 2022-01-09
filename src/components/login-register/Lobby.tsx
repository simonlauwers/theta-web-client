/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as gameApi from "../../api/game/GameApi";
import GameType from "../../types/Game/GameType";
import NewPlayerType from "../../types/NewPlayerType";


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
    const [gameCode, setGameCode] = useState<string>("");
    const [gameMode, setGameMode] = useState<string>("");

    const { mutate } = useMutation("addPlayerToGame", gameApi.addPlayer, {
        onSuccess: (data: GameType) => {
            // navigate or whatever
            console.log(data);
        },
        onError: (error: any) => {
            console.log(error);
        }
    });

    const { isLoading } = useQuery("getGame", () => gameApi.getGame(gameId!), {
        onSuccess: (data: GameType) => {
            console.log(data);
            setPlayers(data.players);
            setLastUpdate(data.updateTimestamp);
            setGameCode(data.gameCode);
            setGameMode(data.gameMode);

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

    const addAi = () => {
        mutate({ name: "", aiPlayer: true, gameId: gameId! } as NewPlayerType);
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
                {gameMode.toUpperCase() !== "SINGLE" && gameMode !== "" &&
                    <Typography fontFamily="bebas-neue" gutterBottom variant="h5" component="div" sx={{ fontSize: "4rem", position: "absolute", bottom: 0, color: "white" }}>
                        Gamecode: {gameCode}
                    </Typography>
                }


                <Button variant="contained" disabled={players.length < 2} onClick={() => initializeGame()}>Start game</Button>
                {gameMode.toUpperCase() === "SINGLE" && gameMode !== "" &&
                    <Button variant="contained" onClick={() => addAi()}>Add AI Player</Button>
                }

            </div>
    );
};