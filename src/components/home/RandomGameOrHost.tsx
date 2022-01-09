/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Grid, Card, CardActionArea, CardContent, Typography, Fade, Button, useMediaQuery, Theme } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WhiteTextField from "../theme/formInputs/WhiteTextField";
import * as gameApi from "../../api/game/GameApi";
import GameType from "../../types/Game/GameType";
import ResponseMessageType from "../../types/ResponseMessageType";
import { useMutation } from "react-query";
import useAuth from "../../hooks/context-hooks/UseAuth";
import JoinGameType from "../../types/Game/JoinGameType";
import { ArrowLeftSharp } from "@mui/icons-material";
export interface PickerValues {
	gameCode: string;
}

export const RandomGameOrHost = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<ResponseMessageType | null>(null);
	const { user } = useAuth();
	const { mutate } = useMutation(gameApi.joinRandomGame, {
		onSuccess: (data: GameType) => {
			setError(null);
			console.log(data);
			navigate(`/${data.uuid}/lobby`);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
			setError(rmt);
		}
	});
	const mobileMediaQuery = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

	const handleJoinRandom = () => {
		mutate({ name: user!.displayName });
	};

	if (mobileMediaQuery) {
		return (
			<Grid container spacing={0} style={{ gap: "5px", maxWidth: "60%", color: "white", margin: 15 }}  >
				<Card sx={{
					"&:hover": {
						transform: "scale(1.05)",
						boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
						transition: "all 0.5s",
						background: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1)  100%)"
					}, background: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1) 100%)", transition: "all 0.5s", color: "white", fontWeight: 500, width: "275px"
				}}>
					<CardActionArea sx={{ textAlign: "center" }} onClick={() => navigate("/multi/scenarios")}>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1rem", fontWeight: 670 }}>
								HOST <br /> NEW GAME
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card >
				<Typography gutterBottom variant="h5" component="div" sx={{
					fontSize: "2rem", MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none"
				}}>
					OR
				</Typography>
				<Card sx={{
					"&:hover": {
						transform: "scale(1.05)",
						boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
						transition: "all 0.5s",
					}, background: "linear-gradient(180deg, rgba(79,38,16,1) 0%, rgba(41,5,10,1) 100%)", transition: "all 0.5s", color: "white"
				}}>
					<CardActionArea sx={{ textAlign: "center" }} onClick={handleJoinRandom}>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1rem", fontWeight: 670 }}>
								JOIN <br /> RANDOM
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card >
				<Link to={"/home"}>
					<Button variant="outlined" style={{ position: "absolute", top: 15, right: "46%", fontSize: 15, textAlign: "center" }}>
						<ArrowLeftSharp />Back
					</Button>
				</Link>
			</Grid >
		);
	}

	return (
		<>
			<Fade in={true} style={{ transitionDelay: "50ms" }}>

				<Grid container spacing={0} style={{ display: "flex", flexDirection: "row", gap: "40px", maxWidth: "100%", color: "white", alignItems: "center", justifyContent: "center", height: "100vh", marginLeft: "-240px" }}  >
					<Card sx={{
						"&:hover": {
							transform: "scale(1.05)",
							boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
							transition: "all 0.5s",
							background: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1)  100%)"
						}, background: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1) 100%)", transition: "all 0.5s", color: "white", fontWeight: 500, height: "350px", width: "275px"
					}}>
						<CardActionArea sx={{ height: "100%", textAlign: "center" }} onClick={() => navigate("/multi/scenarios")}>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "3rem", fontWeight: 670 }}>
									HOST <br /> NEW GAME
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card >
					<Typography gutterBottom variant="h5" component="div" sx={{
						fontSize: "2rem", MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none"
					}}>
						OR
					</Typography>
					<Card sx={{
						"&:hover": {
							transform: "scale(1.05)",
							boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
							transition: "all 0.5s",
						}, background: "linear-gradient(180deg, rgba(79,38,16,1) 0%, rgba(41,5,10,1) 100%)", transition: "all 0.5s", color: "white", height: "350px"
					}}>
						<CardActionArea sx={{ height: "100%", textAlign: "center" }} onClick={handleJoinRandom}>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "3rem", fontWeight: 670 }}>
									JOIN <br /> RANDOM
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card >
				</Grid >
			</Fade>
			<Link to={"/home"}>
				<Button variant="outlined" style={{ position: "absolute", top: 15, right: "46%", fontSize: 15, textAlign: "center" }}>
					<ArrowLeftSharp />Back
				</Button>
			</Link>
		</>

	);
};

