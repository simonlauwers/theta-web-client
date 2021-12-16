/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Card } from "@mui/material";
import React from "react";
import PlayerType from "../../types/Game/PlayerType";
import parsePlayerColor from "../../utils/game/PlayerColorParser";

interface PlayerCardProps {
	player: PlayerType;
	current: boolean;
}

const PlayerCard = (playerCardProps: PlayerCardProps) => {
	const backgroundColor = parsePlayerColor(playerCardProps.player.playerColor)!.dark;
	const marginLeft = playerCardProps.current? "1rem" : "2rem";

	return (
		<Card sx={{padding: "1rem", marginLeft: {marginLeft}, backgroundColor: {backgroundColor}}}>
			{playerCardProps.player.name}
		</Card>
	);
};

export default PlayerCard;