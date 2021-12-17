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
    console.log("lobby rerender");
    const { gameId } = useParams();
    const [players, setPlayers] = useState<Player[]>([]);
    const { user } = useAuth();
    const { data, isLoading } = useQuery("getGame", () => gameApi.getGame(gameId!));
    const navigate = useNavigate();

    useEffect(() => {
        console.log("using effect");
        if (!isLoading) {
            console.log(data);
            if (players.length == 0) {
                console.log("getting existing players");
                setPlayers(data.players);
            }
            console.log(data.players.length);
            if (data.players.length == 0) {
                console.log("adding user to game");
                addPlayer({ name: user!.displayName, aiPlayer: false, gameId: gameId! });
            }
        }
    }, []);


    const { mutate: addPlayer } = useMutation(gameApi.addPlayer, {
        onSuccess: (data: GameType) => {
            setPlayers(data.players);
        },
        onError: (e: any) => {
            console.log(e);
        }
    });

    const { mutate: initGame } = useMutation(gameApi.initializeGame, {
        onSuccess: (data: GameType) => {
            navigate(`/game/${data.uuid}`);
        },
        onError: (e: any) => {
            console.log(e);
        }
    });



    const addRandomPlayer = async () => {
        const firstnames = ["Youssef", "Bart", "Siemen", "Nathan", "Daniel", "Quinten", "Simon"];
        const lastnames = ["Taouil", "Vochten", "Van de Mosselaer", "Tetroashvilii", "Savin", "Verhelst", "Lauwers"];
        const randomFn = Math.floor(Math.random() * 6) + 1;
        const randomLn = Math.floor(Math.random() * 6) + 1;
        const randomName = firstnames[randomFn] + " " + lastnames[randomLn];
        const newPlayer = { name: randomName, aiPlayer: false, gameId: gameId! };
        addPlayer(newPlayer);
    };

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
                <Button variant="contained" disabled={players.length === 6} onClick={() => addRandomPlayer()}>Add random player</Button>
                <Button variant="contained" onClick={() => initializeGame()}>Start game</Button>

            </div>
    );
};