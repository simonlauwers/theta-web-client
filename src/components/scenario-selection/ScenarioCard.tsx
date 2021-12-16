import { Card, CardContent, Typography } from "@mui/material";
import ScenarioType from "../../types/Game/ScenarioType";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";

interface ScenarioCardProps {
	scenario: ScenarioType;
	selected: boolean
}

const ScenarioCard = (props: ScenarioCardProps) => {
	return (
		<>
			<Card sx={{ mt: 2, mb: 2 }}>
				<CardContent>
					<Typography>
						{props.scenario.name}
					</Typography>
					<Typography>
						{props.scenario.description}
					</Typography>
					{props.selected && <CheckIcon color="success" />}
				</CardContent>
			</Card>

		</>
	);

};

export default ScenarioCard;