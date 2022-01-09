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
	gameCode: string
}

export const Picker = () => {
	const navigate = useNavigate();
	const { gameMode } = useParams<string>();
	const { user } = useAuth();
	const [error, setError] = useState<ResponseMessageType | null>(null);
	const mobileMediaQuery = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

	const formik = useFormik({
		initialValues: {
			gameCode: "",
		},
		onSubmit: async (gameCode: PickerValues) => {
			mutate({ name: user!.displayName, gameCode: gameCode.gameCode } as unknown as JoinGameType);
		},
	});

	const { mutate } = useMutation(gameApi.joinGame, {
		onSuccess: (data: GameType) => {
			setError(null);
			navigate(`/${data.uuid}/lobby`);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			setError(rmt);
		}
	});

	if (mobileMediaQuery) {
		return (
			<div style={{ margin: 15 }}>
				<Grid container spacing={0} style={{ gap: "40px", maxWidth: "100%", color: "white", alignItems: "center" }}  >
					<Grid item xs={12}>
						<Card sx={{ background: "linear-gradient(180deg, rgba(79,38,16,1) 0%, rgba(41,5,10,1) 100%)", color: "white", fontWeight: 500 }}>
							<CardActionArea sx={{ height: "100%", textAlign: "center" }} onClick={() => navigate(`/${gameMode}/scenarios`)}>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "2rem", fontWeight: 700 }}>
										HOST
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card >
					</Grid>
					<Grid item xs={12}>
						<Typography gutterBottom variant="h5" component="div" sx={{
							fontSize: "14px", MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none"
						}}>
							OR
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<form onSubmit={formik.handleSubmit}>
							<Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "2rem", fontWeight: 700 }}>
								ENTER GAMECODE
							</Typography>
							<Grid sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
								<WhiteTextField className="TextField-without-border-radius" sx={{ display: "inline-block", borderRadius: 0 }}
									label="Gamecode"
									placeholder="XXXX"
									id="gameCode"
									variant="filled"
									inputProps={{ maxLength: 4 }}
									name="gameCode"
									autoComplete="none"
									value={formik.values.gameCode}
									onChange={formik.handleChange}
								/>
								<Button variant="contained" type="submit" sx={{ display: "inline-block" }}>Join</Button>
							</Grid>
							{error && <span style={{ color: "white" }}>{error}</span>}
						</form>
					</Grid>
				</Grid >
				<Link to={"/home"}>
					<Button variant="outlined" style={{ position: "absolute", top: 15, right: "46%", fontSize: 15, textAlign: "center" }}>
						<ArrowLeftSharp />Back
					</Button>
				</Link>
			</div>
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
						}, background: "linear-gradient(180deg, rgba(79,38,16,1) 0%, rgba(41,5,10,1) 100%)", color: "white", fontWeight: 500, height: "350px", width: "275px"
					}}>
						<CardActionArea sx={{ height: "100%", textAlign: "center" }} onClick={() => navigate(`/${gameMode}/scenarios`)}>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "4rem", fontWeight: 700, position: "absolute", bottom: 0, }}>
									HOST
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card >
					<Typography gutterBottom variant="h5" component="div" sx={{
						fontSize: "2rem", MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none"
					}}>
						OR
					</Typography>
					<form onSubmit={formik.handleSubmit}>
						<Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "4rem", fontWeight: 700 }}>
							ENTER GAMECODE
						</Typography>
						<Grid sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
							<WhiteTextField className="TextField-without-border-radius" sx={{ display: "inline-block", borderRadius: 0 }}
								label="Gamecode"
								placeholder="XXXX"
								id="gameCode"
								variant="filled"
								inputProps={{ maxLength: 4 }}
								name="gameCode"
								autoComplete="none"
								value={formik.values.gameCode}
								onChange={formik.handleChange}
							/>
							<Button variant="contained" type="submit" sx={{ display: "inline-block" }}>Join</Button>
						</Grid>
						{error && <span style={{ color: "white" }}>{error}</span>}
					</form>
				</Grid >
			</Fade >
			<Link to={"/home"}>
				<Button variant="outlined" style={{ position: "absolute", top: 15, right: "46%", fontSize: 15, textAlign: "center" }}>
					<ArrowLeftSharp />Back
				</Button>
			</Link>
		</>
	);
};

