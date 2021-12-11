import React from "react";
import { GameProvider } from "../../contexts/GameContext";
import GameInitializer from "./GameInitializer";

const Game = () => {
	return (
		<GameProvider>
			<GameInitializer/>
		</GameProvider>
	);
};

export default Game;