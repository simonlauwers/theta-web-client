import { Card, Typography } from "@mui/material";
import React from "react";
import { backgroundColor } from "../../theme/colors";
import ScenarioType from "../../types/Game/ScenarioType";

interface ScenarioPreviewCardProps {
	scenario: ScenarioType;
}

const ScenarioPreviewCard = (props: ScenarioPreviewCardProps) => {
	return (
		<Card sx={{
			minHeight: "100%", maxHeight: "100%", padding: 5, backgroundColor: backgroundColor.main
		}}>

			<Typography onDragStart={(e) => { e.preventDefault(); }} style={{ fontSize: 35, color: "white", fontWeight: 800, textAlign: "center" }}>
				{props.scenario.name}
			</Typography>
			
			<img style={{
				marginLeft: "15%", marginTop: 10, marginBottom: 10
			}} width={"70%"} src={props.scenario.image} alt={props.scenario.name} onDragStart={(e) => { e.preventDefault(); }} />

		</Card>
	);
};

export default ScenarioPreviewCard;