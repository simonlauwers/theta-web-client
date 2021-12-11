import React from "react";
import useGame from "../../hooks/UseGame";
import PlayerCard from "./PlayerCard";

const PlayerList = () => {
	const { players, currentPlayer } = useGame();

	return (
		<div>
			{players.map((player) => (
				<PlayerCard key={player.uuid} player={player} current={player.uuid === currentPlayer?.uuid} />
			))}
		</div>
	);
};

export default PlayerList;