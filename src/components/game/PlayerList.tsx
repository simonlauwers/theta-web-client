import React from "react";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import PlayerCard from "./PlayerCard";

const PlayerList = () => {
	const { players, currentPlayer } = usePlayer();

	return (
		<div style={{position:"absolute", right: 0, top: 0, padding: "2rem"}}>
			{players.map((player) => (
				<PlayerCard key={player.uuid} player={player} current={player.uuid === currentPlayer?.uuid} />
			))}
		</div>
	);
};

export default PlayerList;