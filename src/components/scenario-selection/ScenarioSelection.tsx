/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, CircularProgress, useMediaQuery, Theme } from "@mui/material";
import ScenarioCard from "./ScenarioCard";
import { useQuery } from "react-query";
import * as gameApi from "../../api/game/GameApi";
import ScenarioType from "../../types/Game/ScenarioType";
import { Link, useNavigate } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import { success } from "../../theme/colors";
import { LoadingScreen } from "../extra/LoadingScreen";
import ScenarioPreviewCarousel from "./ScenarioPreviewCarousel";



const ScenarioSelection = () => {
	/*
	* A map that consists of an index (K) and a scenario (V)
	* Used for the carousel
	*/
	const [scenarioPerIndex] = useState<Map<number, ScenarioType>>(new Map<number, ScenarioType>());
	/*
	* Index of the current scenario (based on the ScenarioPerIndex map)
	* Used for the carousel
	*/
	const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
	const [scenarioSelected, setScenarioSelected] = useState<ScenarioType | null>(null);
	/*
	* Automatic refetching when the query mounts is set to false to prevent automatic/unnecessary creation of game when mounting
	* createGame is used to refetch the query 
	*/
	const { data: createdGame, refetch: createGame, isLoading: createGameIsLoading, isFetchedAfterMount } = useQuery("createGame", () => gameApi.createGame(scenarioSelected!.uuid), {
		refetchOnWindowFocus: false,
		enabled: false
	});
	const { data: scenarios, isLoading } = useQuery("scenarios", () => gameApi.getAllScenarios());
	const navigate = useNavigate();

	const toggleScenarioSelected = (scenario: ScenarioType) => {
		scenario == scenarioSelected ? setScenarioSelected(null) : setScenarioSelected(scenario);
		scenarioPerIndex.forEach((scenarioInMap, index) => {
			if (scenarioInMap === scenario) {
				setCurrentScenarioIndex(index);
			};
		});
	};

	const handleStartGame = async () => {
		createGame();
	};

	const mobileMediaQuery = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));


	useEffect(() => {
		if (!createGameIsLoading && createdGame !== undefined && isFetchedAfterMount) {
			navigate(`/${createdGame.uuid}/lobby`);
		}
	}, [createGameIsLoading, createdGame]);

	useEffect(() => {
		if (scenarios != undefined) {
			scenarios.map((scenario: ScenarioType, ind: number) => {
				scenarioPerIndex.set(ind, scenario);
			});
		}
	}, [scenarios, isLoading]);

	if (isLoading) {
		return (
			<LoadingScreen></LoadingScreen>
		);
	} else if (mobileMediaQuery) {
		return (
			<Grid container style={{ padding: 15 }}>
				<Grid item md={12} style={{ marginTop: 25, marginLeft: "2em" }}>
					<Link to="/home" style={{ color: "white" }}><Button variant="outlined">{"< "}Go Back</Button></Link>
					<Typography onDragStart={(e) => { e.preventDefault(); }} style={{ textAlign: "left", fontSize: 22, marginTop: 10, color: "white", fontWeight: 800 }}>
						Pick a scenario.
					</Typography>
					<Typography onDragStart={(e) => { e.preventDefault(); }} style={{ textAlign: "left", color: "white", fontSize: 18 }}>
						Pick a scenario that you would like to play.
					</Typography>
				</Grid>
				<Grid item style={{ marginTop: "3%" }}>
					<div style={{ paddingRight: 20, paddingLeft: 20, maxHeight: "60%", overflow: "scroll" }}>
						{scenarios != undefined ? scenarios.map((scenario: ScenarioType) =>
							<div key={scenario.uuid} onClick={() => toggleScenarioSelected(scenario)}>
								<ScenarioCard key={scenario.uuid} scenario={scenario} selected={scenario === scenarioSelected} />
							</div>
						) : <CircularProgress />}
					</div>
					<Button sx={{ minWidth: "100%", fontWeight: 700, color: "white", marginTop: 5, backgroundColor: success[400], fontSize: 30 }} disabled={scenarioSelected === null} variant="contained" onClick={() => handleStartGame()}>Start game</Button>
				</Grid>
			</Grid>
		);
	} else {
		return (
			<>
				<Grid container>
					<Grid item md={12} style={{ marginTop: 25, marginLeft: "2em" }}>
						<Link to="/home" style={{ color: "white" }}><Button variant="outlined">{"< "}Go Back</Button></Link>
						<Typography onDragStart={(e) => { e.preventDefault(); }} style={{ textAlign: "left", fontSize: 30, color: "white", fontWeight: 800 }}>
							Pick a scenario.
						</Typography>
						<Typography onDragStart={(e) => { e.preventDefault(); }} style={{ textAlign: "left", color: "white", fontSize: 22 }}>
							Pick a scenario that you would like to play.
						</Typography>
					</Grid>
					<Grid item xs={12} md={6} style={{ marginTop: "3%" }}>
						<Scrollbars width={150} >
							<div style={{ paddingRight: 20, paddingLeft: 20 }}>
								{scenarios != undefined ? scenarios.map((scenario: ScenarioType) =>
									<div key={scenario.uuid} onClick={() => toggleScenarioSelected(scenario)}>
										<ScenarioCard key={scenario.uuid} scenario={scenario} selected={scenario === scenarioSelected} />
									</div>
								) : <CircularProgress />}
							</div>
						</Scrollbars>
					</Grid>
					<Grid item xs={12} md={6} style={{ paddingLeft: 25, paddingRight: 50, marginTop: "2%" }}>
						{scenarios != undefined ? <ScenarioPreviewCarousel scenarioPerIndex={scenarioPerIndex} currentSlide={currentScenarioIndex} callbackSelectScenario={toggleScenarioSelected} scenarios={scenarios} />
							: <CircularProgress />}
						<Button sx={{ minWidth: "100%", fontWeight: 700, color: "white", backgroundColor: success[400], fontSize: 30 }} disabled={scenarioSelected === null} variant="contained" onClick={() => handleStartGame()}>Start game</Button>
					</Grid>
				</Grid>
			</>
		);
	}
};

export default ScenarioSelection;