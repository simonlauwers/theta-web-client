import React from "react";
import { Grid } from "@mui/material";
import ScenarioCard from "./ScenarioCard";
import { useQuery } from "react-query";
import * as gameApi from "../../api/game/GameApi";
import ScenarioType from "../../types/Game/ScenarioType";

const ScenarioSelection = () => {
	const { data, isLoading } = useQuery("scenarios", () => gameApi.getAllScenarios());

	if (isLoading) {
		return (<div>Loading...</div>);
	} else {
		return (
			<Grid sx={{ pt: "13%" }} container>
				<Grid item xs={12} md={6}>
					{data.map((scenario: ScenarioType) =>
						<ScenarioCard key={scenario.uuid} scenario={scenario} />
					)
					}
				</Grid>
			</Grid>

		);
	}
};

export default ScenarioSelection;