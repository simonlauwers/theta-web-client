import React, { useState } from "react";
import { GameProvider } from "../../contexts/game/GameContext";
import { MapProvider } from "../../contexts/game/MapContext";
import { PhaseProvider } from "../../contexts/game/PhaseContext";
import { PlayerProvider } from "../../contexts/game/PlayerContext";
import GameInitializer from "./GameInitializer";
import Controls from "./Controls";
import PlayerList from "./PlayerList";
import World from "./World";
import { TerritoryProvider } from "../../contexts/game/TerritoryContext";

const Game = () => {
	const [initializing, setInitializing] = useState(true);

	return (
		<GameProvider>
			<MapProvider>
				<PhaseProvider>
					<PlayerProvider>
						<TerritoryProvider>
							{
								initializing ?
									<GameInitializer setInitializing={setInitializing} />
									:
									<>
										<World />
										<PlayerList />
										<Controls />
									</>
							}
						</TerritoryProvider>
					</PlayerProvider>
				</PhaseProvider>
			</MapProvider>
		</GameProvider>
	);
};

export default Game;