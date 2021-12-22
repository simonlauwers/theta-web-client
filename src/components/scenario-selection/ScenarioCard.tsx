import { Card, CardContent, Typography } from "@mui/material";
import ScenarioType from "../../types/Game/ScenarioType";
import React from "react";

interface ScenarioCardProps {
	scenario: ScenarioType;
	selected: boolean
}


const scenarioCardStyling = {
	mt: 2,
	mb: 2,
	color: "white",
	maxWidth: "100%",
	background: "inherit",
	boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .3)",
	zIndex: 1,
	transition: "0.5s",
	"&:before": {
		filter: "blur(10px)",
		zIndex: -1
	},
	"&:hover": {
		transform: "scale(1.03)",
		transition: "all 0.5s",
		boxShadow: "inset 0 0 1900px rgba(255, 255, 255, 0.5)"
	}
};

const selectedScenarioCardStyling = {
	mt: 2,
	mb: 2,
	color: "white",
	maxWidth: "100%",
	boxShadow: "inset 0 0 2000px rgba(255, 255, 255, 0.7),0 0 20px 5px #4B4350",
	borderColor: "#151120",
	background: "inherit",
	zIndex: 1,
	transition: "0.5s",
	"&:hover": {
		transform: "scale(1.03)",
		transition: "all 0.5s",
		boxShadow: "inset 0 0 2000px rgba(255, 255, 255, 0.8),0 0 20px 6px #4B4350",
	}
};

const ScenarioCard = (props: ScenarioCardProps) => {
	return (
		<>
			<Card sx={props.selected ? selectedScenarioCardStyling : scenarioCardStyling}>
				<CardContent>
					<Typography style={{ fontSize: 30, fontWeight: 800 }}>
						{props.scenario.name}
					</Typography>
					<Typography style={{ fontSize: 21, fontWeight: 400 }}>
						{props.scenario.description}
					</Typography>
				</CardContent>
			</Card>

		</>
	);

};

export default ScenarioCard;