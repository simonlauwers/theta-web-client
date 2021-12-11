import { useContext } from "react";
import { GameContext, GameContextType } from "../contexts/GameContext";

export default function useGame(): GameContextType {
	return useContext(GameContext);
}