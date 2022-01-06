/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import PlayerType from "../../types/Game/PlayerType";
import parsePlayerColor from "../../utils/game/PlayerColorParser";
import { backgroundColor } from "../../theme/colors";

interface PlayerCardProps {
	player: PlayerType;
	current: boolean;
}

const PlayerCard = (playerCardProps: PlayerCardProps) => {
	const playerColors = parsePlayerColor(playerCardProps.player.playerColor);

	return (
			<div style={{height : "10vh", width : "20vw", display: "flex", justifyContent:"end", userSelect:"none", marginBottom:"5vh"}}>
				<div style={{width: "20%", height: "100%", 
				background: "linear-gradient(to right, rgba(20,17,36,0) 10%, rgba(20,17,36,1) 100%)", 
				display: "flex", alignItems: "center"}}>
				</div>
				<div style={{padding: "2rem", 
								width: playerCardProps.current ? "80%" : "50%", 
								height: "100%", background: backgroundColor.main, display: "flex", alignContent: "center",
								transition: "width 1s"
							}}>
					<div style={{display: "flex", alignItems:"center", width:"100%"}}>
					<div style={{display: "flex", alignItems: "center"}}>
						<h1 style={{ 
						fontSize: "80%", 
						margin: 0, color: playerColors?.main, 
						transition: "text-shadow 1s",
						zIndex: 10
						}}><b>{playerCardProps.player.name}</b></h1>
					</div>
					</div>
				</div>
			</div>
	);
};

export default PlayerCard;