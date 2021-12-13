import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { version } from "./../package.json";
import { AuthProvider } from "./contexts/AuthContext";
import ThetaTheme from "./theme/ThetaTheme";

ReactDOM.render(
	<React.StrictMode>
		{console.log("Running Thèta webclient version " + version)}
		<ThetaTheme>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ThetaTheme>
	</React.StrictMode>,
	document.getElementById("root")
);
