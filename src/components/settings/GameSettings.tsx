import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import useSettings from "../../hooks/context-hooks/UseSettings";
import React from "react";


const GameSettings = () => {
	const { colorBlindMode, setColorBlindMode } = useSettings();

	return (
		<div style={{ marginTop: 20 }}>
			<FormGroup>
				<FormControlLabel sx={{ color: "white" }}
					control={<Switch onChange={(event: React.ChangeEvent<HTMLInputElement>) => setColorBlindMode(event.target.checked)} defaultChecked={colorBlindMode} />}
					label="Color blind mode" />
			</FormGroup>
		</div>
	);
};

export default GameSettings;