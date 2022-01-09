/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";
import PlayerType from "../../types/game/PlayerType";

export interface PlayerContextType {
	players: PlayerType[];
	currentPlayer: PlayerType | null;
	setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>;
	setCurrentPlayer: React.Dispatch<React.SetStateAction<PlayerType | null>>;
}

export const PlayerContext = createContext<PlayerContextType>({
	players: [],
	currentPlayer: null,
	setPlayers: () => { },
	setCurrentPlayer: () => { }
});

export const PlayerProvider: FC = ({ children }) => {
	const [players, setPlayers] = useState<PlayerType[]>([]);
	const [currentPlayer, setCurrentPlayer] = useState<PlayerType | null>(null);

	return (
		<PlayerContext.Provider value={{ players, currentPlayer, setPlayers, setCurrentPlayer }}>
			{children}
		</PlayerContext.Provider>
	);

};