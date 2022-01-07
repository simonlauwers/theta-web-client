import React, { useState } from "react";
import { GameProvider } from "../../contexts/game/GameContext";
import { MapProvider } from "../../contexts/game/MapContext";
import { PhaseProvider } from "../../contexts/game/PhaseContext";
import { PlayerProvider } from "../../contexts/game/PlayerContext";
import GameInitializer from "./GameInitializer";
import Controls from "./Controls";
import Players from "./Players";
import World from "./World";
import { TerritoryProvider } from "../../contexts/game/TerritoryContext";
import { DiceProvider } from "../../contexts/game/DiceContext";
import Dice from "./Dice";
import { ErrorProvider } from "../../contexts/game/ErrorContext";
import Options from "./Options";
import ErrorHandler from "./ErrorHandler";

const Game = () => {
	const [initializing, setInitializing] = useState(true);

	return (
		<GameProvider>
			<MapProvider>
				<PhaseProvider>
					<PlayerProvider>
						<TerritoryProvider>
							<DiceProvider>
								<ErrorProvider>
								{
									initializing ?
										<GameInitializer setInitializing={setInitializing} />
										:
										<>
											<World />
											<Dice />
											<Players />
											<Controls />
											<Options />
											<ErrorHandler />
										</>
								}
								</ErrorProvider>	
							</DiceProvider>
						</TerritoryProvider>
					</PlayerProvider>
				</PhaseProvider>
			</MapProvider>
		</GameProvider>
	);
};

export default Game;