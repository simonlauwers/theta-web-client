import "./App.css";
import Login from "./components/login-register/Login";
import HomeLayout from "./components/layouts/HomeLayout";
import ScenarioLayout from "./components/layouts/ScenarioLayout";
import {
	BrowserRouter as Router,
	Route,
	Routes
} from "react-router-dom";
import React from "react";
import Register from "./components/login-register/Register";
import AuthLayout from "./components/layouts/AuthLayout";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Confirm } from "./components/login-register/Confirm";
import { ResetPasswordEmail } from "./components/login-register/ResetPasswordEmail";
import { NewPassword } from "./components/login-register/NewPassword";
import Game from "./components/game/Game";
import { NotFound } from "./components/Error/NotFound";
import { AuthProvider } from "./contexts/AuthContext";


function App() {

	return (
		<>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/" element={<PrivateRoute />}>
							<Route path="/" element={<HomeLayout />} />
							<Route path="/home" element={<HomeLayout />} />
						</Route>

						<Route element={<AuthLayout />}>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Register />} />
							<Route path="/:token/confirm" element={<Confirm />} />
							<Route path="/reset-password-email" element={<ResetPasswordEmail />} />
							<Route path="/:token/reset" element={<NewPassword />} />
						</Route>
						<Route path="/game/:gameUuid" element={<Game />} />

						<Route path="/scenarios" element={<ScenarioLayout />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Router>
			</AuthProvider>
		</>
	);
}


export default App;
