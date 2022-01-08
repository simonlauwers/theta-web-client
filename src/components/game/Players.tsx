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
		setDialog(`${current} is playing...`);
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
			<div style={{position: "absolute", top: 0, left: 0, height:"100vh", width:"100vw", animationName:"fade-in-out", animationDuration: "2.5s",
			display: "flex", justifyContent: "center", alignContent: "center", zIndex: 50, boxShadow: "inset 0 0 500px black", userSelect:"none",
			background: "rgba(0,0,0,0.7)"}}>
			<div style={{marginTop: "auto", marginBottom: "auto"}}>
				<Typography variant="h1" color={"white"}>
					{dialog}
				</Typography>
				</div>
			</div>}
			
			{ playerStates.filter(ps => ps.userUuid === user?.userId && ps.dead).length > 0 &&
			<div style={{position: "absolute", top: 0, left: "35vw", right: "35vw", background: "linear-gradient(180deg, rgba(79,18,16,1) 0%, rgba(41,5,25,1) 100%)",
			zIndex: 50, userSelect:"none", borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem"}}>
				<div style={{display: "flex", justifyContent: "center", alignContent: "center", flexWrap: "wrap"}}>
					<Typography variant="h4" color={"white"} style={{textAlign: "center", width: "100%", marginTop: "2rem"}}>
						You are defeated...
					</Typography>
					{ user!.userId !== creator &&
						<Button variant="contained" onClick={() => {navigate("/home");}} sx={{ backgroundColor: "ghostwhite", color: "#141124", 
						fontWeight: "bold", width: "50%", marginTop: "1rem", marginBottom: "2rem" }}>
							Leave game
						</Button>
					}
				</div>
			</div>}

			{ winner !== null && 
			<div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, background: backgroundColor.main,
			display: "flex", justifyContent: "center", alignContent: "center", zIndex: 100, userSelect:"none",
			animationName:"fade-in", animationDuration: "2.5s"}}>
				<div style={{marginTop: "auto", marginBottom: "auto", display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
					<Typography variant="h1" color={"white"} style={{width:"100%", textAlign: "center"}}>
						{winner}
					</Typography>
					<Button variant="contained" onClick={() => {navigate("/home");}} sx={{ backgroundColor: "ghostwhite", color: "#141124", 
						fontWeight: "bold", width: "40%", marginTop: "1rem", marginLeft: "auto", marginRight:"auto" }}>
							Leave game
					</Button>
				</div>
			</div>}
		</>
	);
};



export default Players;