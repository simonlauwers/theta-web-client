/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";
import GameMetaType from "../../types/Game/GameMetaType";

export interface GameContextType {
    meta : GameMetaType | null;
    setMeta : React.Dispatch<React.SetStateAction<GameMetaType | null>>;
}

export const GameContext = createContext<GameContextType>({
	meta : null,
	setMeta : () => {}
});

export const GameProvider: FC = ({children}) => {
	const [meta, setMeta] = useState<GameMetaType | null>(null);

	return (
		<GameContext.Provider value={{meta, setMeta}}>
			{children}
		</GameContext.Provider>
	);

};