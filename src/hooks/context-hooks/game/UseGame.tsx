import { useContext } from "react";
import { GameContext, GameContextType } from "../../../contexts/game/GameContext";

export default function useGame(): GameContextType {
	return useContext(GameContext);
}
