import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { version } from "./../package.json";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import ThetaTheme from "./theme/ThetaTheme";

const queryGeneralClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 15000,
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		{console.log("Running Thèta webclient version " + version)}
		<ThetaTheme>
			<QueryClientProvider client={queryGeneralClient} contextSharing={true}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</QueryClientProvider>
		</ThetaTheme>
	</React.StrictMode>,
	document.getElementById("root")
);
