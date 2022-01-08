import { useEffect, useState } from "react";
import useSettings from "./context-hooks/UseSettings";

export enum SoundType {
	ControlSfx,
	BackgroundMusic,
	Other
}

export const useSound = (url: string, soundType: SoundType) => {
	const { clickSoundsEnabled, backgroundMusicEnabled } = useSettings();
	const [audio] = useState(new Audio(url));

	useEffect(() => {
		if (!backgroundMusicEnabled) {
			audio.pause();
		}
	}, [backgroundMusicEnabled]);

	const play = () => {
		switch (soundType) {
			case SoundType.ControlSfx:
				if (clickSoundsEnabled) {
					audio.play();
				};
				break;
			case SoundType.BackgroundMusic:
				if (backgroundMusicEnabled) {
					audio.volume = 0.03;
					audio.loop = true;
					audio.play();
				};
				break;
			default:
				audio.play();
				break;
		};

	};

	return play;
};
