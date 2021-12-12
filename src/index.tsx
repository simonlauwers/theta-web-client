import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { version } from "./../package.json";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

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
		<QueryClientProvider client={queryGeneralClient} contextSharing={true}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
