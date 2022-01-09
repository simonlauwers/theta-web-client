/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";
import GameMetaType from "../../types/game/GameMetaType";

export interface GameContextType {
	meta: GameMetaType | null;
	creator: string;
	maxTime: number;
	setMeta: React.Dispatch<React.SetStateAction<GameMetaType | null>>;
	setCreator: React.Dispatch<React.SetStateAction<string>>;
	setMaxTime: React.Dispatch<React.SetStateAction<number>>;
}

export const GameContext = createContext<GameContextType>({
	meta: null,
	creator: "",
	maxTime: 0,
	setMeta: () => { },
	setCreator: () => { },
	setMaxTime: () => { }
});

export const GameProvider: FC = ({ children }) => {
	const [meta, setMeta] = useState<GameMetaType | null>(null);
	const [creator, setCreator] = useState<string>("");
	const [maxTime, setMaxTime] = useState<number>(60);

	return (
		<GameContext.Provider value={{ meta, creator, maxTime, setMeta, setCreator, setMaxTime }}>
			{children}
		</GameContext.Provider>
	);

};