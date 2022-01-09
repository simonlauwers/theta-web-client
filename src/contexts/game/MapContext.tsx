/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from "react";
import { useState, FC } from "react";
import MapType from "../../types/Game/MapType";

export interface MapContextType {
	map: MapType | null;
	setMap: React.Dispatch<React.SetStateAction<MapType | null>>;
}

export const MapContext = createContext<MapContextType>({
	map: null,
	setMap: () => { }
});

export const MapProvider: FC = ({ children }) => {
	const [map, setMap] = useState<MapType | null>(null);

	return (
		<MapContext.Provider value={{ map, setMap }}>
			{children}
		</MapContext.Provider>
	);

};