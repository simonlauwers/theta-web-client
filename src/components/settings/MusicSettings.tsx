import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import useSettings from "../../hooks/context-hooks/UseSettings";
import React from "react";


const MusicSettings = () => {
	const { backgroundMusicEnabled, clickSoundsEnabled, setBackgroundMusicEnabled, setClickSoundsEnabled } = useSettings();

	return (
		<div style={{ marginTop: 20 }}>
			<FormGroup>
				<FormControlLabel sx={{ color: "white" }}
					control={<Switch onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBackgroundMusicEnabled(event.target.checked)} defaultChecked={backgroundMusicEnabled} />}
					label="Background music" />
			</FormGroup>
			<FormGroup>
				<FormControlLabel sx={{ color: "white" }}
					control={<Switch onChange={(event: React.ChangeEvent<HTMLInputElement>) => setClickSoundsEnabled(event.target.checked)} defaultChecked={clickSoundsEnabled} />}
					label="Controls click sounds" />
			</FormGroup></div>
	);
};

export default MusicSettings;