import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Theme, useMediaQuery } from "@mui/material";
import MusicSettings from "./MusicSettings";
import GameSettings from "./GameSettings";


export const Settings = () => {
	const [value, setValue] = React.useState(0);
	const mobileMediaQuery = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
	const boxStylingOptionsBigScreen = {
		background: "linear-gradient(180deg, rgba(0,39,67,0.5) 0%, rgba(14,14,56,0.5) 100%)", borderRadius: 10, padding: 10, minWidth: 500, maxHeight: 250
	};
	const boxStylingMobile = {
		background: "linear-gradient(180deg, rgba(0,39,67,0.5) 0%, rgba(14,14,56,0.5) 100%)", borderRadius: 10, padding: 10, margin: 2, maxHeight: 250
	};
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div style={{ zIndex: 1001 }} >
			<h1 style={{ color: "white" }} >Settings</h1>
			<Box component="div" style={mobileMediaQuery ? boxStylingMobile : boxStylingOptionsBigScreen}>
				<Tabs textColor="inherit" style={{ color: "white" }} variant={mobileMediaQuery ? "scrollable" : "fullWidth"} value={value} onChange={handleChange} centered>
					<Tab label="Music" />
					<Tab label="Friends" />
					<Tab label="Game" />
				</Tabs>
				{value === 0 ?
					<div style={{ minHeight: 500, padding: 10 }}>
						<MusicSettings></MusicSettings>
					</div>
					: null}
				{value === 1 ? <div style={{ minHeight: "5em" }}></div> : null}
				{value === 2 ? <div style={{ minHeight: 500, padding: 10 }}>
					<GameSettings></GameSettings>
				</div> : null}
			</Box>
		</div>
	);
};
