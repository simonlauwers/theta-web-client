import { useContext } from "react";
import { PlayerContext, PlayerContextType } from "../../../contexts/game/PlayerContext";

export default function usePlayer(): PlayerContextType {
	return useContext(PlayerContext);
}