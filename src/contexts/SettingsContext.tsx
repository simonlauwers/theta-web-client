/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createContext, useEffect } from "react";
import { useState, FC } from "react";


export interface SettingsContextType {
	colorBlindMode: boolean,
	setColorBlindMode: React.Dispatch<React.SetStateAction<boolean>>,
	backgroundMusicEnabled: boolean,
	clickSoundsEnabled: boolean,
	setBackgroundMusicEnabled: React.Dispatch<React.SetStateAction<boolean>>,
	setClickSoundsEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsContext = createContext<SettingsContextType>({
	colorBlindMode: false,
	setColorBlindMode: () => { },
	backgroundMusicEnabled: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	clickSoundsEnabled: true,
	setBackgroundMusicEnabled: () => { },
	setClickSoundsEnabled: () => { }
});

export const SettingsProvider: FC = ({
	children
}) => {
	const [backgroundMusicEnabled, setBackgroundMusicEnabled] = useState<boolean>(false);
	const [clickSoundsEnabled, setClickSoundsEnabled] = useState<boolean>(true);
	const [colorBlindMode, setColorBlindMode] = useState<boolean>(false);

	useEffect(() => {
		const clickSoundsEnabledFromLs = JSON.parse(localStorage.getItem("clickSoundsEnabled") as string);
		if (clickSoundsEnabledFromLs != null) {			
			setClickSoundsEnabled(clickSoundsEnabledFromLs);
		}

		const colorBlindModeFromLs = JSON.parse(localStorage.getItem("colorBlindMode") as string);
		if (colorBlindModeFromLs != null) {
			setColorBlindMode(colorBlindModeFromLs);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("colorBlindMode", JSON.stringify(colorBlindMode));
	}, [colorBlindMode]);

	useEffect(() => {
		localStorage.setItem("backgroundMusicEnabled", JSON.stringify(backgroundMusicEnabled));
	}, [backgroundMusicEnabled]);

	useEffect(() => {
		localStorage.setItem("clickSoundsEnabled", JSON.stringify(clickSoundsEnabled));
	}, [clickSoundsEnabled]);

	return (
		<SettingsContext.Provider value={{ colorBlindMode, setColorBlindMode, backgroundMusicEnabled, clickSoundsEnabled, setBackgroundMusicEnabled, setClickSoundsEnabled }}>
			{children}
		</SettingsContext.Provider>
	);

};



