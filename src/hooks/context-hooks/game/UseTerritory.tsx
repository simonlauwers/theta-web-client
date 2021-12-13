import { useContext } from "react";
import { TerritoryContext, TerritoryContextType } from "../../../contexts/game/TerritoryContext";

export default function useTerritory(): TerritoryContextType {
	return useContext(TerritoryContext);
}