/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import ScenarioCard from "./ScenarioCard";
import { useQuery } from "react-query";
import * as gameApi from "../../api/game/GameApi";
import ScenarioType from "../../types/Game/ScenarioType";
import { useNavigate } from "react-router-dom";



const ScenarioSelection = () => {
	const { data: scenarios, isLoading } = useQuery("scenarios", () => gameApi.getAllScenarios());
	const [scenarioSelected, setScenarioSelected] = useState<ScenarioType | null>(null);
	const { data: createdGame, refetch: createGame, isLoading: createGameIsLoading, isFetchedAfterMount } = useQuery("createGame", () => gameApi.createGame(scenarioSelected!.uuid), {
		refetchOnWindowFocus: false,
		enabled: false
	});
	const navigate = useNavigate();

	const toggleScenarioSelected = (scenario: ScenarioType) => {
		scenario == scenarioSelected ? setScenarioSelected(null) : setScenarioSelected(scenario);
	};

	const handleStartGame = async () => {
		console.log("refetching");
		createGame();
	};

	useEffect(() => {
		console.log(createdGame);
		console.log(isFetchedAfterMount);
		if (!createGameIsLoading && createdGame !== undefined && isFetchedAfterMount) {
			console.log("redirecting to lobby");
			navigate(`/${createdGame.uuid}/lobby`);
		}
	}, [createGameIsLoading, createdGame]);

	if (isLoading) {
		return (<div>Loading...</div>);
	} else {
		return (
			<Grid sx={{ pt: "13%" }} container spacing={2}>
				<Grid item xs={12} md={6}>
					{scenarios.map((scenario: ScenarioType) =>
						<div key={scenario.uuid} onClick={() => toggleScenarioSelected(scenario)}>
							<ScenarioCard key={scenario.uuid} scenario={scenario} selected={scenario == scenarioSelected} />
						</div>
					)
					}
					<Button disabled={scenarioSelected === null} variant="contained" onClick={() => handleStartGame()}>Start game</Button>
				</Grid>
			</Grid>

		);
	}
};

export default ScenarioSelection;