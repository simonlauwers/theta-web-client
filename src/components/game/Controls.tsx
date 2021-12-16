import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import GameType from "../../types/Game/GameType";
import ResponseMessageType from "../../types/ResponseMessageType";
import AttackControl from "./phase-controls/AttackControl";
import DraftControl from "./phase-controls/DraftControl";
import FortifyControl from "./phase-controls/FortifyControl";

const Controls = () => {
	const { phase, setPhase } = usePhase();
	const { setPlayers, setCurrentPlayer } = usePlayer();
	const [ game, setGame ] = useState<GameType | null>(null);
	const [ error, setError] = useState<ResponseMessageType | null>(null);

	useEffect(() => {
		if(error !== null) {
			setTimeout(() => {setError(null);}, 2000);
		}
	}, [error]);

	useEffect(() => {
		if (game !== null) {
			setPhase(game.gamePhase);
			setPlayers(game.players);
			setCurrentPlayer(game.currentPlayer);
		}
	}, [game]);

	return (
		<div style={{position: "absolute", bottom: 0, left: 0, padding: "1rem"}}>
			<Card sx={{padding: "2rem"}}>
				<Typography>
					{phase} {error?.message}
				</Typography>
				{phase === "DRAFT" && <DraftControl setGame={setGame} setError={setError}/>}
				{phase === "ATTACK" && <AttackControl setGame={setGame} setError={setError}/>}
				{phase === "FORTIFY" && <FortifyControl setGame={setGame} setError={setError}/>}
			</Card>
		</div>
	);
};

export default Controls;