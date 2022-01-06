/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect } from "react";
import { useState, FC } from "react";

export interface DiceContextType {
    attackerRoll : number[];
    defenderRoll : number[];
    showingRoll : boolean;
    setAttackerRoll : React.Dispatch<React.SetStateAction<number[]>>;
    setDefenderRoll : React.Dispatch<React.SetStateAction<number[]>>;
    setShowingRoll : React.Dispatch<React.SetStateAction<boolean>>;
}

export const DiceContext = createContext<DiceContextType>({
	attackerRoll : [],
	defenderRoll : [],
	showingRoll : false,
	setAttackerRoll : () => {},
	setDefenderRoll : () => {},
	setShowingRoll : () => {}
});

export const DiceProvider: FC = ({children}) => {
	const [attackerRoll, setAttackerRoll] = useState<number[]>([]);
	const [defenderRoll, setDefenderRoll] = useState<number[]>([]);
	const [showingRoll, setShowingRoll] = useState<boolean>(false);

    useEffect(() => {
        if(showingRoll) {
            setTimeout(() => {setShowingRoll(false);}, 2500);
        }
    }, [showingRoll]);

	return (
		<DiceContext.Provider value={{attackerRoll, defenderRoll, showingRoll, setAttackerRoll, setDefenderRoll, setShowingRoll}}>
			{children}
		</DiceContext.Provider>
	);

};