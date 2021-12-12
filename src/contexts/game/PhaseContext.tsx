/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";

export interface PhaseContextType {
    phase : string;
    setPhase : React.Dispatch<React.SetStateAction<string>>;
}

export const PhaseContext = createContext<PhaseContextType>({
	phase : "",
	setPhase : () => {}
});

export const PhaseProvider: FC = ({children}) => {
	const [phase, setPhase] = useState<string>("");

	return (
		<PhaseContext.Provider value={{phase, setPhase}}>
			{children}
		</PhaseContext.Provider>
	);

};