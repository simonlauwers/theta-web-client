/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useGame from "../../hooks/context-hooks/game/UseGame";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import useAuth from "../../hooks/context-hooks/UseAuth";
import PlayerCard from "./PlayerCard";
import { backgroundColor } from "../../theme/colors";
import { useNavigate } from "react-router-dom";
import "./animations.css"; 

interface PlayerState {
	name : string;
	userUuid : string;
	dead : boolean;
}

const Players = () => {
	const { creator } = useGame();
	const { players, currentPlayer } = usePlayer();
	const { user } = useAuth();
	const navigate = useNavigate();

	const [ playerStates, setPlayerStates ] = useState<PlayerState[]>([]);
	const [ dialog, setDialog ] = useState<string | null>(null);
	const [ winner, setWinner ] = useState<string | null>(null);
	const [ current, setCurrent ] = useState<string>("");
	const [ initialized, setInitialized ] = useState(false);

	useEffect(() => {

		const states : PlayerState[] = [];
		for (let index = 0; index < players.length; index++) {
			states.push({name: players[index].name, userUuid: players[index].user.uuid, dead: players[index].dead});
		}
		setPlayerStates(states);
		setInitialized(true);
	}, []);

	useEffect(() => {
		if (initialized) {
			const states : PlayerState[] = [];
			for (let index = 0; index < players.length; index++) {
				states.push({name: players[index].name, userUuid: players[index].user.uuid, dead: players[index].dead});
			}
	
			const playerStatesSorted = playerStates.sort((a, b) => { return a.userUuid.localeCompare(b.userUuid);});
			const statesSorted = states.sort((a, b) => { return a.userUuid.localeCompare(b.userUuid);});
			const difference : PlayerState[] = [];

			for (let index = 0; index < statesSorted.length; index++) {
				if(playerStatesSorted[index].dead !== statesSorted[index].dead) {
					difference.push(statesSorted[index]);
				}				
			}

			console.log(difference.length);
	
			if (difference.length > 0) {
				setDialog(`${difference[0].name} Defeated!`);
				setPlayerStates(states);
			}
		}
	}, [players]);

	useEffect(() => {
		setCurrent(currentPlayer!.name);
	}, [currentPlayer]);

	useEffect(() => {
		setDialog(`${current} is playing.`);
	}, [current]);

	useEffect(() => {
		if(dialog !== null) {
            setTimeout(() => {setDialog(null);}, 2500);
        }
	}, [dialog]);

	useEffect(() => {
		const alive : PlayerState[] = playerStates.filter(player => !player.dead);

		if(alive.length === 1) {
			if(user!.userId === alive[0].userUuid) {
				setWinner("Congratulations you won the game!");
			} else {
				setWinner(`${alive[0].name} won the game!`);
			}
			
		}
		
	}, [playerStates]);

	return (
		<>
			<div style={{position:"absolute", right: 0, top: "10vh"}}>
				{players.sort().map((player) => (
					<PlayerCard key={player.uuid} player={player} current={player.uuid === currentPlayer?.uuid} />
				))}

			</div>
			{ dialog !== null && 
			<div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, animationName:"fade-in-out", animationDuration: "2.5s",
			display: "flex", justifyContent: "center", alignContent: "center", zIndex: 50, boxShadow: "inset 0 0 100px black", userSelect:"none"}}>
				<Typography variant="h1" color={"white"}>
					{dialog}
				</Typography>
			</div>}

			{ playerStates.filter(ps => ps.userUuid === user?.userId && ps.dead).length > 0 &&
			<div style={{position: "absolute", top: 0, left: "30vh", right: "30vh", background: backgroundColor.main,
			display: "flex", justifyContent: "center", alignContent: "center", zIndex: 50, flexWrap: "wrap", userSelect:"none"}}>
				<Typography variant="h4" color={"white"}>
					You are defeated...
				</Typography>
				{ user!.userId !== creator &&
					<Button variant="contained" onClick={() => {navigate("/home");}} sx={{ backgroundColor: "ghostwhite", color: "#141124", 
					fontWeight: "bold", width: "50%" }}>
						Leave game
					</Button>
				}
			</div>}

			{ winner !== null && 
			<div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, background: backgroundColor.main,
			display: "flex", justifyContent: "center", alignContent: "center", zIndex: 50, userSelect:"none"}}>
				<Typography variant="h1" color={"white"}>
					{winner}
				</Typography>
				<Button variant="contained" onClick={() => {navigate("/home");}} sx={{ backgroundColor: "ghostwhite", color: "#141124", 
					fontWeight: "bold", width: "50%" }}>
						Leave game
				</Button>
			</div>}
		</>
	);
};



export default Players;