import React, { useEffect, useState } from "react";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import GameType from "../../types/Game/GameType";
import AttackControl from "./phase-controls/AttackControl";
import DraftControl from "./phase-controls/DraftControl";
import FortifyControl from "./phase-controls/FortifyControl";

const Controls = () => {
	const { phase, setPhase } = usePhase();
	const { setPlayers, setCurrentPlayer } = usePlayer();
	const [ game, setGame ] = useState<GameType | null>(null);

	useEffect(() => {
		if (game !== null) {
			setPhase(game.gamePhase);
			setPlayers(game.players);
			setCurrentPlayer(game.currentPlayer);
		}
	}, [game]);

	return (
		<div>
			{phase}
			{phase === "DRAFT" && <DraftControl setGame={setGame}/>}
			{phase === "ATTACK" && <AttackControl setGame={setGame}/>}
			{phase === "FORTIFY" && <FortifyControl setGame={setGame}/>}
		</div>
	);
};

export default Controls;