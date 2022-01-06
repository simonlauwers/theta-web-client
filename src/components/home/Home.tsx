/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Avatar, Button, Fade, Grid, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";
import React from "react";
import useAuth from "../../hooks/context-hooks/UseAuth";
import { GameModeCard } from "./GameModeCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const gamemodeList =
		[
			{
				gradientColors: "linear-gradient(180deg, rgba(0,49,15,1) 0%, rgba(0,36,33,1) 100%)",
				text: "SINGLE",
				url: "/single/scenarios",
				image: "/media/photos/game-visuals/tank.png"
			},
			{

				gradientColors: "linear-gradient(180deg, rgba(79,18,16,1) 0%, rgba(41,5,25,1) 100%)",
				text: "MULTI",
				url: "/multi/scenarios",
				image: "/media/photos/game-visuals/soldier.png"
			},
			{
				gradientColors: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1) 100%)",
				text: "FRIENDS",
				url: "/friends/scenarios",
				image: "/media/photos/game-visuals/friends.png"
			}
		];
	return (
		<>
			<div style={{ zIndex: 9999, marginLeft: 50 }}>
				<Fade in={true} style={{ transitionDelay: "50ms" }}>
					<Grid sx={{ paddingTop: "2%" }} container spacing={6} >
						<Grid item xs={12} md={6} style={{ color: "white" }}>
							<h1 style={{ fontSize: "8em", margin: "0px 0 40px -9px" }}>RISK</h1>
							<p style={{ marginTop: "-3em", fontSize: "2em" }}>You played 10 hours in total.</p>
							<Button style={{ marginTop: "-2em" }} variant="contained" sx={{ backgroundColor: "secondary[100]" }} onClick={() => navigate("/stats")}>See all stats</Button>
						</Grid>
						<Grid item xs={12} md={6} style={{ color: "white", paddingTop: "80px", display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
							<Avatar onClick={() => navigate("/profile")} sx={{ bgcolor: "grey", width: 180, height: 180, boxShadow: 5, ":hover": { cursor: "pointer" } }}><img src={user!.profilePicture} onDragStart={(e) => { e.preventDefault(); }} /></Avatar>
							<Typography variant="h4">Welcome back {user!.displayName}!</Typography>

						</Grid>
					</Grid>
				</Fade>

				<Fade in={true} style={{ transitionDelay: "50ms" }}>
					<Grid style={{ marginBottom: "5%", marginTop: "2.5%" }} container spacing={2} >

						<Grid item xs={12} md={12} style={{ color: "white" }}>
							<p style={{ fontSize: "2em" }}>Ready to conquer the world?</p>
						</Grid>


						<Grid container spacing={0} style={{ display: "flex", flexDirection: "row", maxWidth: "100%", height: "30%", color: "white" }}  >
							{gamemodeList.map((gamemode) => {
								return (
									<Grid item xs={12} md={4} lg={4} key={gamemode.text} style={{ color: "white" }}>
										<GameModeCard
											gradientColors={gamemode.gradientColors}
											text={gamemode.text}
											url={gamemode.url}
											image={gamemode.image} />
									</Grid>
								);
							})}

						</Grid>

					</Grid>
				</Fade>
			</div >

		</>
	);
};

export default Home;