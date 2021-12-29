/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";

export interface PhaseContextType {
    phase : string;
    setPhase : React.Dispatch<React.SetStateAction<string>>;
	lastUpdate : string;
	setLastUpdate : React.Dispatch<React.SetStateAction<string>>;
}

export const PhaseContext = createContext<PhaseContextType>({
	phase : "",
	setPhase : () => {},
	lastUpdate : "",
	setLastUpdate : () => {}
});

export const PhaseProvider: FC = ({children}) => {
	const [phase, setPhase] = useState<string>("");
	const [lastUpdate, setLastUpdate] = useState<string>("");

	return (
		<PhaseContext.Provider value={{phase, lastUpdate, setPhase, setLastUpdate}}>
			{children}
		</PhaseContext.Provider>
	);

};