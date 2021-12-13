import React from "react";
import PlayerType from "../../types/Game/PlayerType";

interface PlayerCardProps {
	player: PlayerType;
	current: boolean;
}

const PlayerCard = (playerCardProps: PlayerCardProps) => {
	return (
		<div>
			name: {playerCardProps.player.name}, color: {playerCardProps.player.playerColor}, {playerCardProps.current && "CURRENT"}
		</div>
	);
};

export default PlayerCard;