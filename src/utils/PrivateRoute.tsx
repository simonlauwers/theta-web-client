import React, { useEffect } from "react";
import useAuth from "../hooks/UseAuth";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingScreen } from "../components/extra/LoadingScreen";

export const PrivateRoute = () => {
	const { user, loading, error } = useAuth();

	useEffect(() => {
		if (!loading) {
			if (!user) {
				console.log("we checked and user is still null");
			} else {
				console.log("we checked and found a user");
			}
		}
	}, [user, loading, error]);

	return (
		<>
			{loading ? <LoadingScreen></LoadingScreen> : !error && user ? <Outlet /> : <Navigate to="/login" />}
		</>
	);
};