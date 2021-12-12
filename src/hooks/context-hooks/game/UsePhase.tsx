import { useContext } from "react";
import { PhaseContext, PhaseContextType } from "../../../contexts/game/PhaseContext";

export default function usePhase(): PhaseContextType {
	return useContext(PhaseContext);
}