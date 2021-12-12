import { useContext } from "react";
import { MapContext, MapContextType } from "../../../contexts/game/MapContext";

export default function useMap(): MapContextType {
	return useContext(MapContext);
}