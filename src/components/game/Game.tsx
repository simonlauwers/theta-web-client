import React from "react";
import { GameProvider } from "../../contexts/GameContext";
import GameInitializer from "./GameInitializer";
import PhaseMenu from "./PhaseMenu";
import PlayerList from "./PlayerList";
import World from "./World";

const Game = () => {
	return (
		<GameProvider>
			<GameInitializer/>
			<World/>
			<PlayerList/>
			<PhaseMenu/>
		</GameProvider>
	);
};

export default Game;