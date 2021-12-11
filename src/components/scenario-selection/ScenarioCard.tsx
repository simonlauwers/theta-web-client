import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import ScenarioType from "../../types/ScenarioType";
import React from "react";


interface ScenarioCardProps {
    scenario : ScenarioType;
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