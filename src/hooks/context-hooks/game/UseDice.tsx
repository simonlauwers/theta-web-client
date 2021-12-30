import { useContext } from "react";
import { DiceContext, DiceContextType } from "../../../contexts/game/DiceContext";

export default function useDice(): DiceContextType {
	return useContext(DiceContext);
}
