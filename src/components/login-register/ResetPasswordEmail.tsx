import { Grid, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { ResetPasswordEmailForm } from "./ResetPasswordEmailForm";
import { backgroundColor } from "../../theme/colors";


const ResetPasswordEmail = () => {
	return (
		<Grid item xs={12} md={12} lg={6} style={{ backgroundColor: backgroundColor.main, height: "100vh" }}>
			<Breadcrumbs style={{ marginLeft: "2em", marginTop: "1em", color: "ghostwhite" }}>
				<Link to="/login">Back to login</Link>
			</Breadcrumbs>
			<div style={{ marginTop: "25%", marginLeft: "25%" }}>
				<h1 style={{ color: "ghostwhite" }}>Forgot your password?<br></br> No worries, we got you.</h1>
				<ResetPasswordEmailForm />
			</div>
		</Grid>
	);
};

export default ResetPasswordEmail;