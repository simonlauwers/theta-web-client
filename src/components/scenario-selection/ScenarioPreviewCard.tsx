import { Card, Typography } from "@mui/material";
import React from "react";
import ScenarioType from "../../types/Game/ScenarioType";

interface ScenarioPreviewCardProps {
	scenario: ScenarioType;
}

const ScenarioPreviewCard = (props: ScenarioPreviewCardProps) => {
	return (
		<Card sx={{
			minHeight: "100%", maxHeight: "100%", padding: 5, background: "inherit",
			boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .3)",
		}}>

			<Typography onDragStart={(e) => { e.preventDefault(); }} style={{ fontSize: 35, color: "white", fontWeight: 800, textAlign: "center" }}>
				{props.scenario.name}
			</Typography>
			<img style={{
				marginLeft: "25%", marginTop: 10, marginBottom: 10
			}} width={"50%"} src={props.scenario.image} alt={props.scenario.name} onDragStart={(e) => { e.preventDefault(); }} />

		</Card>
	);
};

export default ScenarioPreviewCard;