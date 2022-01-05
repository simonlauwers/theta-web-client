/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, CircularProgress } from "@mui/material";
import ScenarioCard from "./ScenarioCard";
import { useMutation, useQuery } from "react-query";
import * as gameApi from "../../api/game/GameApi";
import ScenarioType from "../../types/Game/ScenarioType";
import { Link, useNavigate, useParams } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import { success } from "../../theme/colors";
import { LoadingScreen } from "../extra/LoadingScreen";
import ScenarioPreviewCarousel from "./ScenarioPreviewCarousel";
import useAuth from "../../hooks/UseAuth";
import CreateGameType from "../../types/CreateGameType";
import GameType from "../../types/Game/GameType";



const ScenarioSelection = () => {
	const { gameMode } = useParams<string>();
	const { user } = useAuth();
	console.log(user);
	const [scenarioPerIndex] = useState<Map<number, ScenarioType>>(new Map<number, ScenarioType>());
	const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
	const [scenarioSelected, setScenarioSelected] = useState<ScenarioType | null>(null);



	const { mutate: createGame } = useMutation(gameApi.createGame, {
		onSuccess: (createdGame: GameType) => {
			navigate(`/${createdGame.uuid}/lobby`);
		},
		onError: () => {
			//handle error
		}
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
		const body = {
			scenarioId: scenarioSelected!.uuid,
			gameMode: gameMode!.toUpperCase(),
			name: user!.displayName
		} as CreateGameType;
		createGame(body);
	};

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
	} else {
		return (
			<>
				<Grid container>
					<Grid item md={12} style={{ marginTop: 25 }}>
						<Link to="/home" style={{ color: "white" }}><Button variant="outlined">{"< "}Go Back</Button></Link>
						<Typography onDragStart={(e) => { e.preventDefault(); }} style={{ textAlign: "left", fontSize: 35, color: "white", fontWeight: 800 }}>
							PICK A SCENARIO
						</Typography>
						<Typography onDragStart={(e) => { e.preventDefault(); }} style={{ textAlign: "left", color: "white", fontSize: 25 }}>
							Pick a scenario that you would like to play.
						</Typography>
					</Grid>
					<Grid item xs={12} md={6} style={{ marginTop: "1%" }}>
						<Scrollbars width={150} style={{ height: "70%" }}>
							<div style={{ paddingRight: 25, paddingLeft: 25 }}>
								{scenarios != undefined ? scenarios.map((scenario: ScenarioType) =>
									<div key={scenario.uuid} onClick={() => toggleScenarioSelected(scenario)}>
										<ScenarioCard key={scenario.uuid} scenario={scenario} selected={scenario === scenarioSelected} />
									</div>
								) : <CircularProgress />}
							</div>
						</Scrollbars>

					</Grid>
					<Grid item xs={12} md={6} style={{ paddingLeft: 25, paddingRight: 25, marginTop: "1%" }}>
						{scenarios != undefined ? <ScenarioPreviewCarousel scenarioPerIndex={scenarioPerIndex} currentSlide={currentScenarioIndex} callbackSelectScenario={toggleScenarioSelected} scenarios={scenarios} />
							: <CircularProgress />}
						<Button sx={{ minWidth: "100%", fontWeight: 700, color: "white", backgroundColor: success[400], fontSize: 30, marginTop: 5 }} disabled={scenarioSelected === null} variant="contained" onClick={() => handleStartGame()}>Start game</Button>

					</Grid>
				</Grid>
			</>
		);
	}
};

export default ScenarioSelection;