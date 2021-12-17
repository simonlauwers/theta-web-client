import { Grid, Theme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router";
import React from "react";
import Particles from "react-tsparticles";


const AuthLayout = () => {
	const mobileMediaQuery = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));


	return (
		<div>
			<Grid container>
				{mobileMediaQuery ?
					<Grid item xs={12} sm={12} style={{ backgroundImage: "url(\"/media/photos/game-visuals/MedievalSoldiers.png\")", backgroundSize: "cover", backgroundRepeat: "repeat-x" }}>
						<div style={{ marginLeft: "5%" }}>
							<h1 style={{ fontSize: 25, marginTop: "5%", color: "white", fontFamily: "Request" }}>RISK</h1>
							<p style={{ fontWeight: 200, color: "white" }}>Brought to you by Thèta.<br></br> It is recommended to play Risk on a bigger screen.</p>
						</div>
					</Grid>
					:
					<Grid md={6} lg={6} style={{ zIndex: -99999, height: "100vh", backgroundImage: "url(\"/media/photos/game-visuals/MedievalSoldiers.png\")", backgroundSize: "cover", backgroundRepeat: "repeat" }}>
						<div style={{ marginLeft: "20%", zIndex: 9999, position: "relative" }}>
							<h1 style={{ fontSize: 120, marginTop: "20%", color: "white", fontFamily: "Request" }}>RISK</h1>
							<h2 style={{ marginTop: "-5em", fontWeight: 200, color: "white" }}>Brought to you by Thèta.</h2>
						</div>
						<div style={{ zIndex: -100 }}>
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
					</Grid>}
				<Outlet />
			</Grid>

		</div>
	);
};
export default AuthLayout;