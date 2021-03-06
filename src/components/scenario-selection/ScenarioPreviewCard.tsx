import { Typography } from "@mui/material";
import React from "react";
import ScenarioType from "../../types/Game/ScenarioType";

interface ScenarioPreviewCardProps {
	scenario: ScenarioType;
}

const ScenarioPreviewCard = (props: ScenarioPreviewCardProps) => {
	return (
		<div>
			<Typography onDragStart={(e) => { e.preventDefault(); }} style={{ fontSize: 20, color: "white", fontWeight: 700, textAlign: "center" }}>
				{props.scenario.name}
			</Typography>

			<img style={{ objectFit: "cover", padding: 5 }} width={"100%"} height={"100%"} src={props.scenario.image} alt={props.scenario.name} onDragStart={(e) => { e.preventDefault(); }} />
		</div>
	);
};

export default ScenarioPreviewCard;