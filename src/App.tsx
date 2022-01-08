import "./App.css";
import Login from "./components/login-register/Login";
import HomeLayout from "./components/layouts/HomeLayout";
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
import { NewPassword } from "./components/login-register/NewPassword";
import Game from "./components/game/Game";
import { NotFoundScreen } from "./components/extra/NotFoundScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { Stats } from "./components/home/Stats";
import { Profile } from "./components/home/Profile";
import Home from "./components/home/Home";
import ResetPasswordEmail from "./components/login-register/ResetPasswordEmail";
import ScenarioSelection from "./components/scenario-selection/ScenarioSelection";
import { Lobby } from "./components/login-register/Lobby";
import { SettingsProvider } from "./contexts/SettingsContext";
import { Settings } from "./components/settings/Settings";
import { Picker } from "./components/home/Picker";
import { SocketContext, socket } from "./contexts/ChatContext";
import { Chat } from "./components/game/chat/Chat";

function App() {
	return (
		<>
			<AuthProvider>
				<SettingsProvider>
					<SocketContext.Provider value={socket}>
						<Router>
							<Routes>
								<Route path="/" element={<PrivateRoute />}>
									<Route element={<HomeLayout />}>
										<Route path="/home" element={<Home />} />
										<Route path="/" element={<Home />} />
										<Route path="/stats" element={<Stats />} />
										<Route path="/settings" element={<Settings />} />
										<Route path="/profile" element={<Profile />} />
										<Route path="/:gameMode/scenarios" element={<ScenarioSelection />} />
										<Route path="/:gameMode/picker" element={<Picker />} />
										<Route path="/:gameId/lobby" element={<Lobby />} />
										<Route path="/:gameId/chat" element={<Chat />} />
									</Route>
								</Route>

								<Route element={<AuthLayout />}>
									<Route path="/login" element={<Login />} />
									<Route path="/signup" element={<Register />} />
									<Route path="/:token/confirm" element={<Confirm />} />
									<Route path="/reset-password-email" element={<ResetPasswordEmail />} />
									<Route path="/:token/reset" element={<NewPassword />} />
								</Route>
								<Route path="/game/:gameUuid" element={<Game />} />
								<Route path="*" element={<NotFoundScreen />} />

							</Routes>
						</Router>
					</SocketContext.Provider>
				</SettingsProvider>
			</AuthProvider>

		</>
	);
}


export default App;
