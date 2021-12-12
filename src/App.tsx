import "./App.css";
import Login from "./components/login-register/Login";
import HomeLayout from "./components/layouts/HomeLayout";
import ScenarioLayout from "./components/layouts/ScenarioLayout";
import {
	BrowserRouter as Router,
	Route,
	Routes
} from "react-router-dom";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Register from "./components/login-register/Register";
import AuthLayout from "./components/layouts/AuthLayout";
import ScenarioSelection from "./components/scenario-selection/ScenarioSelection";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Confirm } from "./components/login-register/Confirm";
import { ResetPasswordEmail } from "./components/login-register/ResetPasswordEmail";
import { NewPassword } from "./components/login-register/NewPassword";
import { NotFound } from "./components/Error/NotFound";
import Home from "./components/home/Home";
import { whoAmI } from "./api/user/UserApi";
import useAuth from "./hooks/UseAuth";
import { useWhoAmI } from "./hooks/react-query-hooks/UseWhoAmI";
import { AuthProvider } from "./contexts/AuthContext";
import { Stats } from "./components/home/Stats";
import { Profile } from "./components/home/Profile";
import { Settings } from "./components/home/Settings";


function App() {

	return (
		<>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/" element={<PrivateRoute />}>
							<Route element={<HomeLayout />}>
								<Route path="/home" element={<Home />} />
								<Route path="/stats" element={<Stats />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/profile" element={<Profile />} />
							</Route>
						</Route>



						<Route element={<AuthLayout />}>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Register />} />
							<Route path="/:token/confirm" element={<Confirm />} />
							<Route path="/reset-password-email" element={<ResetPasswordEmail />} />
							<Route path="/:token/reset" element={<NewPassword />} />
						</Route>

						<Route path="/scenarios" element={<ScenarioLayout />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Router>
			</AuthProvider>
		</>
	);
}


export default App;
