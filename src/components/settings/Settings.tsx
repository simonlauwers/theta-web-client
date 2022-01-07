import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import MusicSettings from "./MusicSettings";


export const Settings = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div style={{ zIndex: 10 }}>
			<h1 style={{ color: "white" }} >Settings</h1>
			<Box component="div" style={{ background: "background.paper", minWidth: 500 }}>
				<Tabs textColor="inherit" style={{ color: "white" }} variant="fullWidth" value={value} onChange={handleChange} centered>
					<Tab label="Music" />
					<Tab label="Friends" />
					<Tab label="Game" />
				</Tabs>
				{value === 0 ?
					<div style={{ minHeight: 500 }}>
						<MusicSettings></MusicSettings>
					</div>
					: null}
				{value === 1 ? <div style={{ minHeight: "5em" }}></div> : null}
				{value === 2 ? <div style={{ minHeight: "5em" }}></div> : null}
			</Box>
		</div>
	);
};
