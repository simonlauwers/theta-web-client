import { Grid } from "@mui/material";
import { Outlet } from "react-router";
import React from "react";


const AuthLayout = () => {
	return (
		<div>
			<nav>
			</nav>
			<Grid container>
				<Grid item xs={0} md={6} lg={6} style={{ height: "100vh", backgroundImage: "url(\"/media/photos/game-branding/bgRiskThetaLoginForm.png\")", backgroundSize: "cover" }}>
				</Grid>
				<Outlet />
			</Grid>
		</div>
	);
};
export default AuthLayout;