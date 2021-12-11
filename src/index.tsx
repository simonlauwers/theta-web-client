import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { version } from "./../package.json";
import { AuthProvider } from "./contexts/AuthContext";


ReactDOM.render(
	<React.StrictMode>
		{console.log("Running Thèta webclient version " + version)}
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
