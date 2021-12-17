import { CircularProgress, Theme, useMediaQuery } from "@mui/material";
import React from "react";
import { backgroundColor } from "../../theme/colors";
import { getRandomLoadingMessage } from "../../utils/Utils";




export const LoadingScreen = () => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

	return (
		<main style={{ padding: "1rem", minHeight: "100vh", backgroundColor: backgroundColor.main, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
			<CircularProgress style={{ color: "white" }} thickness={5} size={isMobile ? 75 : 100} disableShrink></CircularProgress>
			<p style={{ color: "white" }}>{getRandomLoadingMessage()}</p>
		</main>
	);
};
