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
import TerritoryCards from "./TerritoryCards";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { ChatContainer } from "./chat/ChatContainer";


const Game = () => {
	const [initializing, setInitializing] = useState(true);

	const defaultTheme = createTheme();
	const theme = createTheme({
		palette: {
			primary: defaultTheme.palette.augmentColor({
				color: {
					main: "#E54C56"
				},
				name: "primary"
			}),
			secondary: defaultTheme.palette.augmentColor({
				color: {
					main: "#FFFFFF"
				},
				name: "secondary"
			})
		} as any
	});


	return (
		<GameProvider>
			<MapProvider>
				<PhaseProvider>
					<PlayerProvider>
						<TerritoryProvider>
							<DiceProvider>
								<ErrorProvider>
									<ThemeProvider theme={theme}>
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
													<TerritoryCards />
													<ChatContainer />
												</>
										}
									</ThemeProvider >
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