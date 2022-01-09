/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import PlayerType from "../../types/game/PlayerType";
import parsePlayerColor from "../../utils/game/PlayerColorParser";

interface PlayerCardProps {
	player: PlayerType;
	current: boolean;
}

const PlayerCard = (playerCardProps: PlayerCardProps) => {
	const playerColors = parsePlayerColor(playerCardProps.player.playerColor);

	return (
		<div style={{ height: "5vh", width: "20vw", display: "flex", justifyContent: "end", userSelect: "none", marginBottom: "3vh" }}>
			<div style={{
				padding: "2rem",
				width: playerCardProps.current ? "80%" : "50%",
				height: "100%", background: playerColors?.gradient, display: "flex", alignContent: "center",
				transition: "width 1s",
				borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem"
			}}>
				<div style={{ display: "flex", alignItems: "center", width: "100%" }}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<h1 style={{
							fontSize: "100%",
							margin: 0, color: "white",
							transition: "text-shadow 1s",
							zIndex: 10
						}}><b>{playerCardProps.player.name} {playerCardProps.player.aiPlayer ? "🤖" : ""}</b></h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerCard;