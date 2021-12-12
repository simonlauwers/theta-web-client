import React, { useState } from "react";
import { GameProvider } from "../../contexts/game/GameContext";
import { MapProvider } from "../../contexts/game/MapContext";
import { PhaseProvider } from "../../contexts/game/PhaseContext";
import { PlayerProvider } from "../../contexts/game/PlayerContext";
import GameInitializer from "./GameInitializer";
import PhaseMenu from "./PhaseMenu";
import PlayerList from "./PlayerList";
import World from "./World";

const Game = () => {
	const [initializing, setInitializing] = useState(true);

	return (
		<GameProvider>
			<MapProvider>
				<PhaseProvider>
					<PlayerProvider>
						{
							initializing?
								<GameInitializer setInitializing={setInitializing}/>
								:
								<>
									<PlayerList />
									<PhaseMenu />
									<World />
								</>
						}
					</PlayerProvider>
				</PhaseProvider>
			</MapProvider>

		</GameProvider>
	);
};

export default Game;