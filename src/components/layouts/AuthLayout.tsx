import { Grid } from "@mui/material";
import { Outlet } from "react-router";
import React from "react";
import Particles from "react-tsparticles";


const AuthLayout = () => {
	return (
		<div>
			<nav>
			</nav>
			<Grid container>
				<Grid item xs={0} md={6} lg={6} style={{ zIndex: -99999, height: "100vh", backgroundImage: "url(\"/media/photos/game-visuals/MedievalSoldiers.png\")", backgroundSize: "cover", backgroundRepeat:"repeat" }}>
					<div style={{ paddingLeft: "25%", zIndex: 9999, position: "relative" }}>
						<h1 style={{ fontSize: 180, color: "white" }}>RISK</h1>
						<h2 style={{ paddingLeft: "2%", marginTop: -170, fontWeight: 200, color: "white" }}>Brought to you by Thèta.</h2>
					</div>
					<div style={{ zIndex: -100 }}>
						<Particles options={{
							background: {
								image: "linear-gradient(rgba(68, 2, 4, 0.50), rgba(0, 0, 0, 0.34))",
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
				<Outlet />
			</Grid>

		</div>
	);
};
export default AuthLayout;