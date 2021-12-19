/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { backgroundColor } from "../../theme/colors";
import Particles from "react-tsparticles";

const ScenarioSelectionTest = () => {
	const [scenarioSelected, setScenarioSelected] = useState<number>(0);
	const navigate = useNavigate();

	const toggleScenarioSelected = (scenario: number) => {
		scenario == scenarioSelected ? setScenarioSelected(0) : setScenarioSelected(scenario);
	};

	const handleStartGame = async () => {
		console.log("refetching");
	};

	const scenarioCardStyling = {
		mt: 2,
		mb: 2,
		color: "white",
		maxWidth: "100%",
		background: "inherit",
		boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .5)",
		zIndex: 1,
		transition: "0.5s",
		"&:before": {
			filter: "blur(10px)",
			zIndex: -1
		},
		"&:hover": {
			transform: "scale(1.03)",
			transition: "all 0.5s",
			boxShadow: "inset 0 0 1900px rgba(255, 255, 255, 0.8)"
		}
	};

	return (
		<Grid sx={{ pt: "5%" }} container style={{ backgroundImage: "url(\"/media/photos/game-visuals/FireTemple.png\")", minHeight: "100vh" }}>
			<Grid item xs={12} md={6}>
				<div key="a" onClick={() => toggleScenarioSelected(1)}>
					<Card sx={scenarioCardStyling}>
						<CardContent>
						<Typography style={{ fontSize: 35, fontWeight: 800 }}>
								Here there will be a title
							</Typography>
							<Typography style={{ fontSize: 21, fontWeight: 400 }}>
								Here there will be a description. It will describe everything. Really, everything. Yes.
							</Typography>
						</CardContent>
					</Card>
				</div>
				<div key="b" onClick={() => toggleScenarioSelected(2)}>
					<Card sx={scenarioCardStyling}>
						<CardContent>
							<Typography style={{ fontSize: 35, fontWeight: 800 }}>
								Here there will be a title
							</Typography>
							<Typography style={{ fontSize: 21, fontWeight: 400 }}>
								Here there will be a description. It will describe everything. Really, everything. Yes.
							</Typography>
						</CardContent>
					</Card>
				</div>
				<div key="c" onClick={() => toggleScenarioSelected(3)}>
					<Card sx={scenarioCardStyling}>
						<CardContent>
							<Typography style={{ fontSize: 35, fontWeight: 800 }}>
								Here there will be a title
							</Typography>
							<Typography style={{ fontSize: 21, fontWeight: 400 }}>
								Here there will be a description. It will describe everything. Really, everything. Yes.
							</Typography>
						</CardContent>
					</Card>
				</div>	<div key="d" onClick={() => toggleScenarioSelected(4)}>
					<Card sx={scenarioCardStyling}>
						<CardContent>
							<Typography style={{ fontSize: 35, fontWeight: 800 }}>
								Here there will be a title
							</Typography>
							<Typography style={{ fontSize: 21, fontWeight: 400 }}>
								Here there will be a description. It will describe everything. Really, everything. Yes.
							</Typography>
						</CardContent>
					</Card>
				</div>	<div key="e" onClick={() => toggleScenarioSelected(5)}>
					<Card sx={scenarioCardStyling}>
						<CardContent>
							<Typography style={{ fontSize: 35, fontWeight: 800 }}>
								Here there will be a title
							</Typography>
							<Typography style={{ fontSize: 21, fontWeight: 400 }}>
								Here there will be a description. It will describe everything. Really, everything. Yes.
							</Typography>
						</CardContent>
					</Card>
				</div>
				<Button disabled={scenarioSelected === null} variant="contained" onClick={() => handleStartGame()}>Start game</Button>
			</Grid>

			<Grid item xs={12} md={6} style={{padding:50}}>
				<Typography style={{ fontSize: 35, color: "white", fontWeight: 800, textAlign: "center" }}>
					Here there will be a title
				</Typography>
			</Grid>

			<div style={{}}>
				<Particles options={{
					background: {
						image: "linear-gradient(rgba(68, 2, 4, 0.25), rgba(0, 0, 0, 0.10))",
					},
					fpsLimit: 40,
					interactivity: {
						events: {
							resize: true,
						},
					},
					particles: {
						number: {
							value: 80,
							density: {
								enable: true,
								area: 800,
							},
						},
						color: {
							value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
						},
						opacity: {
							value: 0.5,
							random: true,
						},
						size: {
							value: 3,
							random: true,
						},
						move: {
							enable: true,
							speed: 1,
							random: false,
						},
					},
					detectRetina: true,
				}}
				/>
			</div>
		</Grid>




	);
};

export default ScenarioSelectionTest;