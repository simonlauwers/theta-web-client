/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as gameApi from "../../api/game/GameApi";
import GameType from "../../types/Game/GameType";
import NewPlayerType from "../../types/NewPlayerType";
import { LoadingScreen } from "../extra/LoadingScreen";
import parsePlayerColor from "../../utils/game/PlayerColorParser";
import { AddOutlined } from "@mui/icons-material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import useErrorHandler from "../../hooks/context-hooks/UseErrorHandler";
import ResponseMessageType from "../../types/ResponseMessageType";
import useAuth from "../../hooks/context-hooks/UseAuth";
import PlayerType from "../../types/Game/PlayerType";
import axios from "axios";
export const Lobby = () => {
	const { gameId } = useParams();
	const { setError } = useErrorHandler();
	const navigate = useNavigate();
	const [players, setPlayers] = useState<PlayerType[]>([]);
	const [game, setGame] = useState<GameType | null>(null);
	const [lastUpdate, setLastUpdate] = useState<string>();
	const [gameCode, setGameCode] = useState<string>("");
	const [gameMode, setGameMode] = useState<string>("");
	const { user } = useAuth();

	const { mutate } = useMutation("addPlayerToGame", gameApi.addPlayer, {
		onSuccess: (data: GameType) => {
			console.log(data);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			setError(rmt);
		}
	});

	const { isLoading } = useQuery("getGame", () => gameApi.getGame(gameId!), {
		onSuccess: (data: GameType) => {
			setGame(data);
			setPlayers(data.players);
			setLastUpdate(data.updateTimestamp);
			setGameCode(data.gameCode);
			setGameMode(data.gameMode);
		}
	});

	useEffect(() => {
		if (game !== null && game!.creator.uuid !== user!.userId && players.filter(pl => pl.user.uuid === user!.userId).length <= 0) {
			setError({status: 401, message: "You were kicked from the game.", timestamp: ""});
			navigate("/home");
		} 
	}, [players]);

	useQuery(
		"pollGame",
		async () => {
			const data = await gameApi.pollGame({ uuid: gameId!, lastUpdate: lastUpdate! });
			if (data.status === 202) {
				const game = data.data as GameType;
				setPlayers(game.players);
				setGame(game);
				if(game.gameState === "PLAYING") {
					navigate(`/game/${game.uuid}`);
				}
			} else if (data.status !== 204) {
				console.log("Error occured during polling.");
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
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			setError(rmt);
		}
	});

	const { mutate : kickPlayer } = useMutation(gameApi.kickPlayer, {
		onSuccess: () => {
			if(game!.creator.uuid !== user!.userId) navigate("/home");
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			setError(rmt);
		}
	});

	const kick = (playerId: string) => {
		kickPlayer({ gameId: game!.uuid, playerId: playerId });
	};

	const initializeGame = async () => {
		await axios.post(process.env.REACT_APP_SOCKET_URL! + "api/chat/room", {
			id: gameId!,
			users: players.map((player) => player.user.uuid)
		});
		initGame(gameId!);
	};

	const addAi = () => {
		mutate({ name: "", aiPlayer: true, gameId: gameId! } as NewPlayerType);
	};


	return (
		isLoading ? <LoadingScreen></LoadingScreen> :
			<div>
				<h1 style={{ color: "white" }} >Game lobby</h1>
				<p style={{ color: "white", fontSize: 16, marginTop: -10 }}>Prepare yourself to become the conquerer of the world.</p>

				<Grid container style={{ display: "flex", alignItems: "stretch", flexDirection: "row" }} >
					{players.map(player => {
						return (
							<Grid key={player.name} item style={{ margin: 11 }} xs={players.length <= 2 ? 6 : 3}>
								<Card sx={{
									mt: 2, mb: 2, background: parsePlayerColor(player.playerColor)?.gradient, borderStyle: "dashed", padding: 2, borderColor: "grey",
									"&:hover": { transform: "scale(1.1)", transition: "400ms" }, transition: "400ms"
								}}>
									<CardContent>
										<Typography style={{ color: "white", fontSize: 22, fontWeight: 700 }}>
											{player.name}
										</Typography>
										{player.aiPlayer ?
											<Typography style={{ color: "white", fontSize: 10, fontWeight: 500 }}>
												<SmartToyOutlinedIcon style={{ color: "white", fontSize: 12, fontWeight: 500 }} /> AI PLAYER
											</Typography> :
											<Typography style={{ color: "white", fontSize: 10, fontWeight: 500 }}>
												<PersonIcon style={{ color: "white", fontSize: 12, fontWeight: 500 }} /> REGULAR PLAYER
											</Typography>
										}
									</CardContent>
									{
									game !== null && game!.creator.uuid === user!.userId && player.user.uuid !== game!.creator.uuid &&
									<CardActions>
										<Button size="small" color="primary" style={{ backgroundColor: "#8c1212" }} onClick={() => {kick(player.uuid);}}>
											<CloseIcon style={{ color: "white" }} />
										</Button>
									</CardActions>
									}


								</Card>
							</Grid>
						);

					})}

					{gameMode.toUpperCase() !== "SINGLE" && gameMode !== "" &&
						<Grid item xs={12}>
							<p style={{ color: "white", fontSize: 16, fontWeight: 600, maxWidth: 250, padding: 10, textAlign: "center", backgroundColor: "rgba(0, 0, 0, 0.38)", borderRadius: 4 }}>Gamecode: {gameCode}</p>
						</Grid>
					}

					<Grid item xs={12}>
						<p style={{ color: "white", fontSize: 16, fontWeight: 600, maxWidth: 250, padding: 10, textAlign: "center", backgroundColor: "rgba(0, 0, 0, 0.38)", borderRadius: 4 }}>{players.length}/6 players</p>
					</Grid>

					<Grid item xs={12}>
						{gameMode.toUpperCase() === "SINGLE" && gameMode !== "" &&
							<Button variant="contained" style={{ padding: 10, marginRight: 10 }} onClick={() => addAi()}><AddOutlined />Add AI Player</Button>
						}
						{game !== null && game!.creator.uuid === user!.userId &&
							<Button variant="contained" style={{ padding: 10, marginRight: 10 }} disabled={players.length < 2} onClick={() => initializeGame()}><KeyboardArrowRightOutlinedIcon />Start game</Button>
						}
					</Grid>
				</Grid>
			</div>
	);
};
