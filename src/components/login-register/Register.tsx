import { Grid, Breadcrumbs, Typography } from "@mui/material";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
import React from "react";
import { backgroundColor } from "../../theme/colors";

const Register = () => {
	return <Grid item xs={12} md={12} lg={6} style={{
		backgroundColor: backgroundColor.main,
		height: "100vh"
	}}>
		<Breadcrumbs style={{
			marginLeft: "2em",
			marginTop: "1em",
			color: "ghostwhite"
		}}>
			<Link to="/login">LOGIN</Link>
			<Typography color="ghostwhite"><b>JOIN</b></Typography>
		</Breadcrumbs>
		<div style={{
			marginTop: "10%",
			marginLeft: "30%"
		}}>
			<h1 style={{
				color: "ghostwhite"
			}}>Join the squad.</h1>
			<RegisterForm />
		</div>

	</Grid>;
};

export default Register;