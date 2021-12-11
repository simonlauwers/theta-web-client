/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";
import GameType from "../types/Game/GameType";
import PlayerType from "../types/Game/PlayerType";

export interface GameContextType {
    game : GameType | null;
    phase : string;
    players : PlayerType[];
    currentPlayer : PlayerType | null;
    attackerRoll : number[];
    defenderRoll : number[];
    setGame : React.Dispatch<React.SetStateAction<GameType | null>>;
    setPhase : React.Dispatch<React.SetStateAction<string>>;
    setPlayers : React.Dispatch<React.SetStateAction<PlayerType[]>>;
    setCurrentPlayer : React.Dispatch<React.SetStateAction<PlayerType | null>>;
    setAttackerRoll : React.Dispatch<React.SetStateAction<number[]>>;
    setDefenderRoll : React.Dispatch<React.SetStateAction<number[]>>;
}

export const GameContext = createContext<GameContextType>({
	game : null,
	phase : "",
	players : [],
	currentPlayer : null,
	attackerRoll : [],
	defenderRoll : [],
	setGame : () => {},
	setPhase : () => {},
	setPlayers : () => {},
	setCurrentPlayer : () => {},
	setAttackerRoll : () => {},
	setDefenderRoll : () => {},
});

export const GameProvider: FC = ({children}) => {
	const [game, setGame] = useState<GameType | null>(null);
	const [phase, setPhase] = useState<string>("");
	const [players, setPlayers] = useState<PlayerType[]>([]);
	const [currentPlayer, setCurrentPlayer] = useState<PlayerType | null>(null);
	const [attackerRoll, setAttackerRoll] = useState<number[]>([]);
	const [defenderRoll, setDefenderRoll] = useState<number[]>([]);

	return (
		<GameContext.Provider value={{game, phase, players, currentPlayer, attackerRoll, defenderRoll,
			setGame, setPhase, setPlayers, setCurrentPlayer, setAttackerRoll, setDefenderRoll}}>
			{children}
		</GameContext.Provider>
	);

};