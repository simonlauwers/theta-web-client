import { Card, CardContent, Typography } from "@mui/material";
import ScenarioType from "../../types/Game/ScenarioType";
import React from "react";


interface ScenarioCardProps {
	scenario: ScenarioType;
}

const ScenarioCard = (props: ScenarioCardProps) => {
	return (
		<Card>
			<CardContent>
				<Typography>
					{props.scenario.name}
				</Typography>
				<Typography>
					{props.scenario.description}
				</Typography>
			</CardContent>
		</Card>
	);

};

export default ScenarioCard;