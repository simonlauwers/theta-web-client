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
import { DiceProvider } from "../../contexts/game/DiceContext";
import Dice from "./Dice";

const Game = () => {
	const [initializing, setInitializing] = useState(true);

	return (
		<GameProvider>
			<MapProvider>
				<PhaseProvider>
					<PlayerProvider>
						<TerritoryProvider>
							<DiceProvider>
							{
								initializing ?
									<GameInitializer setInitializing={setInitializing} />
									:
									<>
										<World />
										<Dice />
										<PlayerList />
										<Controls />
									</>
							}
							</DiceProvider>
						</TerritoryProvider>
					</PlayerProvider>
				</PhaseProvider>
			</MapProvider>
		</GameProvider>
	);
};

export default Game;