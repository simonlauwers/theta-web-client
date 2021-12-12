import "./App.css";
import Login from "./components/login-register/Login";
import HomeLayout from "./components/layouts/HomeLayout";
import ScenarioLayout from "./components/layouts/ScenarioLayout";
import {
	BrowserRouter as Router,
	Route,
	Routes
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Register from "./components/login-register/Register";
import AuthLayout from "./components/layouts/AuthLayout";
import { Home } from "@mui/icons-material";
import ScenarioSelection from "./components/scenario-selection/ScenarioSelection";
import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { Confirm } from "./components/login-register/Confirm";
import { ResetPasswordEmail } from "./components/login-register/ResetPasswordEmail";
import { NewPassword } from "./components/login-register/NewPassword";
import React from "react";
import Game from "./components/game/Game";

function App() {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Router>
						<Routes>
							<Route path="/" element={<PrivateRoute />}>
								<Route path="/" element={<Home />} />
							</Route>

							<Route path="/auth" element={<AuthLayout />}>
								<Route path="/auth/login" element={<Login />} />
								<Route path="/auth/signup" element={<Register />} />
								<Route path="/auth/:token/confirm" element={<Confirm />} />
								<Route path="/auth/reset-password-email" element={<ResetPasswordEmail />} />
								<Route path="/auth/:token/reset" element={<NewPassword />} />
							</Route>

							<Route path="/home" element={<HomeLayout />}>
								<Route path="/home" element={<Home />} />
							</Route>

							<Route path="/scenarios" element={<ScenarioLayout />}>
								<Route path="/scenarios" element={<ScenarioSelection />} />
							</Route>

							<Route path="/game/:gameUuid" element={<Game />} />

							<Route
								path="*"
								element={
									<main style={{ padding: "1rem" }}>
										<p>404 | Page not found!</p>
									</main>
								}
							/>
						</Routes>
					</Router>
				</AuthProvider>
			</QueryClientProvider>

		</>
	);
}


export default App;
