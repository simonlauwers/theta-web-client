import { Grid, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import React from "react";
import { backgroundColor } from "../../theme/colors";
import LanguageSwitcher from "../extra/LanguageSwitcher";
import { useTranslation } from "react-i18next";


const Login = () => {
	const { t } = useTranslation();

	return (
		<Grid item xs={12} md={6} lg={6} style={{ backgroundColor: backgroundColor.main, height: "100vh" }}>
			<Breadcrumbs style={{ marginLeft: "2em", marginTop: "1em", color: "ghostwhite" }}>
				<Typography color="ghostwhite"><b>LOGIN</b></Typography>
				<Link to="/signup">{t("join")}</Link>
			</Breadcrumbs>

			<div style={{ marginTop: "11%", marginLeft: "30%" }}>
				<h1 style={{ color: "ghostwhite" }}>{t("welcome_back")}</h1>
				<p style={{ color: "ghostwhite", marginTop: "-0.5em" }}> {t("new_here") + " "}<Link to="/signup" style={{ textDecoration: "underline" }}>{t("join_the_squad")}.</Link></p>
				<LoginForm />
			</div>

			<div style={{ position: "absolute", bottom: "4%", right: "2%" }}>
				<LanguageSwitcher></LanguageSwitcher>
			</div>

		</Grid>
	);
};

export default Login;