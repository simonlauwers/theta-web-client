/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";
import TerritoryType from "../../types/game/TerritoryType";

export interface TerritoryContextType {
	selectedTerritory: TerritoryType | null;
	outgoingSelectedTerritory: TerritoryType | null;
	incomingSelectedTerritory: TerritoryType | null;
	setSelectedTerritory: React.Dispatch<React.SetStateAction<TerritoryType | null>>;
	setOutgoingSelectedTerritory: React.Dispatch<React.SetStateAction<TerritoryType | null>>;
	setIncomingSelectedTerritory: React.Dispatch<React.SetStateAction<TerritoryType | null>>;
}

export const TerritoryContext = createContext<TerritoryContextType>({
	selectedTerritory: null,
	outgoingSelectedTerritory: null,
	incomingSelectedTerritory: null,
	setSelectedTerritory: () => { },
	setOutgoingSelectedTerritory: () => { },
	setIncomingSelectedTerritory: () => { }
});

export const TerritoryProvider: FC = ({ children }) => {
	const [selectedTerritory, setSelectedTerritory] = useState<TerritoryType | null>(null);
	const [outgoingSelectedTerritory, setOutgoingSelectedTerritory] = useState<TerritoryType | null>(null);
	const [incomingSelectedTerritory, setIncomingSelectedTerritory] = useState<TerritoryType | null>(null);

	return (
		<TerritoryContext.Provider value={{
			selectedTerritory, outgoingSelectedTerritory, incomingSelectedTerritory,
			setSelectedTerritory, setOutgoingSelectedTerritory, setIncomingSelectedTerritory
		}}>
			{children}
		</TerritoryContext.Provider>
	);

};