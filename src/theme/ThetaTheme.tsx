import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { ReactElement } from "react";
import theme from "./theme";

interface ThetaThemeProps {
	children: ReactElement | ReactElement[];
}

const ThetaTheme = ({
	children
}: ThetaThemeProps) => {

	return <ThemeProvider theme={theme}>
		<CssBaseline />
		{children}
	</ThemeProvider>;
};

export default ThetaTheme;