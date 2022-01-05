import { Breadcrumbs, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { backgroundColor } from "../../theme/colors";
import NewPasswordForm from "./NewPasswordForm";


export const NewPassword = () => {

	return (
		<Grid item xs={12} md={12} lg={6} style={{ backgroundColor: backgroundColor.main, height: "100vh" }}>
			<Breadcrumbs style={{ marginLeft: "2em", marginTop: "1em", color: "ghostwhite" }}>
				<Link to="/login">Back to login</Link>
			</Breadcrumbs>
			<div style={{ marginTop: "25%", marginLeft: "25%" }}>
				<h1 style={{ color: "ghostwhite" }}>Change your password.</h1>
				<p style={{ color: "ghostwhite", fontSize: "16", marginTop: -15 }}>Out with the old, in with the new.</p>
				<NewPasswordForm />
			</div>
		</Grid>
	);
};
