/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Fade, Grid } from "@mui/material";
import ProfileCard from "./ProfileCard";
import React from "react";
import useAuth from "../../hooks/UseAuth";
import { GameModeCard } from "./GameModeCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const gamemodeList =
		[
			{
				backgroundImage: "url(\"/media/photos/game-visuals/Badlands.png\")",
				text: "Singleplayer",
				url: "/scenarios"
			},
			{

				backgroundImage: "url(\"/media/photos/game-visuals/FireTemple.png\")",
				text: "Multiplayer",
				url: "/scenarios"
			},
			{
				backgroundImage: "url(\"/media/photos/game-visuals/IcePalace.png\")",
				text: "Friends only",
				url: "/scenarios"
			}
		];
	return (
		<>
			<div style={{ zIndex: 9999, marginLeft: 50, marginTop: "-3%" }}>
				<Fade in={true} style={{ transitionDelay: "50ms" }}>
					<Grid container spacing={6} >
						<Grid item xs={12} md={6} style={{ color: "white" }}>
							<h1 style={{ fontSize: "7em", fontFamily: "request" }}>RISK</h1>
							<p style={{ marginTop: "-3em", fontSize: "2em" }}>You played 10 hours in total.</p>
							<Button style={{ marginTop: "-2em" }} variant="contained" sx={{
								backgroundColor: "#989898", "&:hover": {
									backgroundColor: "#131B2A",
								}
							}} onClick={() => navigate("/stats")}>See all stats</Button>
						</Grid>
						<Grid item xs={12} md={6} style={{ color: "white", paddingTop: "13%" }}>
							<ProfileCard {...user!} />
						</Grid>
					</Grid>
				</Fade>

				<Fade in={true} style={{ transitionDelay: "50ms" }}>
					<Grid style={{ marginBottom: "5%", marginTop: "2.5%" }} container spacing={2} >

						<Grid item xs={12} md={12} style={{ color: "white" }}>
							<p style={{ fontSize: "2em" }}>Ready to conquer the world?</p>
						</Grid>

						<Grid item xs={6} md={12} style={{ marginTop: "-1%", color: "white" }}>
							<Grid container spacing={4} style={{ display: "flex", flexWrap: "nowrap", maxWidth: "100%" }}  >
								{gamemodeList.map((gamemode) => {
									return (
										<Grid item xs={12} key={gamemode.text} style={{ color: "white" }}>
											<GameModeCard
												backgroundImage={gamemode.backgroundImage}
												text={gamemode.text}
												url={gamemode.url} />
										</Grid>
									);
								})}

							</Grid>
						</Grid>
					</Grid>
				</Fade>
			</div >

		</>
	);
};

export default Home;