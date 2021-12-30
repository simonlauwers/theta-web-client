import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import useAuth from "../../hooks/UseAuth";
import GameType from "../../types/Game/GameType";
import ResponseMessageType from "../../types/ResponseMessageType";
import AttackControl from "./phase-controls/AttackControl";
import DraftControl from "./phase-controls/DraftControl";
import FortifyControl from "./phase-controls/FortifyControl";
import PollControl from "./phase-controls/PollControl";

const Controls = () => {
	const { phase, setPhase, setLastUpdate } = usePhase();
	const { currentPlayer, setPlayers, setCurrentPlayer } = usePlayer();
	const { user } = useAuth();
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
			setLastUpdate(game.updateTimestamp);
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
				{(currentPlayer?.user.uuid === user?.userId && !currentPlayer?.aiPlayer) ? 
				<>
					{phase === "DRAFT" && <DraftControl setGame={setGame} setError={setError}/>}
					{phase === "ATTACK" && <AttackControl setGame={setGame} setError={setError}/>}
					{phase === "FORTIFY" && <FortifyControl setGame={setGame} setError={setError}/>}
				</>
				:
				<PollControl setGame={setGame} setError={setError}/>
				}
			</Card>
		</div>
	);
};

export default Controls;