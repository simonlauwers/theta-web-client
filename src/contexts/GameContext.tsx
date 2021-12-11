/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect } from "react";
import { useState, FC } from "react";
import GameMetaType from "../types/Game/GameMetaType";
import PlayerType from "../types/Game/PlayerType";

export interface GameContextType {
    meta : GameMetaType | null;
    phase : string;
    players : PlayerType[];
    currentPlayer : PlayerType | null;
    attackerRoll : number[];
    defenderRoll : number[];
    setMeta : React.Dispatch<React.SetStateAction<GameMetaType | null>>;
    setPhase : React.Dispatch<React.SetStateAction<string>>;
    setPlayers : React.Dispatch<React.SetStateAction<PlayerType[]>>;
    setCurrentPlayer : React.Dispatch<React.SetStateAction<PlayerType | null>>;
    setAttackerRoll : React.Dispatch<React.SetStateAction<number[]>>;
    setDefenderRoll : React.Dispatch<React.SetStateAction<number[]>>;
}

export const GameContext = createContext<GameContextType>({
	meta : null,
	phase : "",
	players : [],
	currentPlayer : null,
	attackerRoll : [],
	defenderRoll : [],
	setMeta : () => {},
	setPhase : () => {},
	setPlayers : () => {},
	setCurrentPlayer : () => {},
	setAttackerRoll : () => {},
	setDefenderRoll : () => {},
});

export const GameProvider: FC = ({children}) => {
	const [meta, setMeta] = useState<GameMetaType | null>(null);
	const [phase, setPhase] = useState<string>("");
	const [players, setPlayers] = useState<PlayerType[]>([]);
	const [currentPlayer, setCurrentPlayer] = useState<PlayerType | null>(null);
	const [attackerRoll, setAttackerRoll] = useState<number[]>([]);
	const [defenderRoll, setDefenderRoll] = useState<number[]>([]);

	return (
		<GameContext.Provider value={{meta, phase, players, currentPlayer, attackerRoll, defenderRoll,
			setMeta, setPhase, setPlayers, setCurrentPlayer, setAttackerRoll, setDefenderRoll}}>
			{children}
		</GameContext.Provider>
	);

};