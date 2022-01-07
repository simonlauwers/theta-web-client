/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createContext, useEffect } from "react";
import { useState, FC } from "react";


export interface SettingsContextType {
	backgroundMusicEnabled: boolean,
	clickSoundsEnabled: boolean,
	setBackgroundMusicEnabled: React.Dispatch<React.SetStateAction<boolean>>,
	setClickSoundsEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsContext = createContext<SettingsContextType>({
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

	useEffect(() => {
		const clickSoundsEnabledFromLs = JSON.parse(localStorage.getItem("clickSoundsEnabled") as string);
		if (clickSoundsEnabledFromLs != null) {
			setClickSoundsEnabled(clickSoundsEnabled);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("backgroundMusicEnabled", JSON.stringify(backgroundMusicEnabled));
	}, [backgroundMusicEnabled]);

	useEffect(() => {
		localStorage.setItem("clickSoundsEnabled", JSON.stringify(clickSoundsEnabled));
	}, [clickSoundsEnabled]);

	return (
		<SettingsContext.Provider value={{ backgroundMusicEnabled, clickSoundsEnabled, setBackgroundMusicEnabled, setClickSoundsEnabled }}>
			{children}
		</SettingsContext.Provider>
	);

};



