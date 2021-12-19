import React, { useEffect } from "react";
import useAuth from "../hooks/UseAuth";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingScreen } from "../components/extra/LoadingScreen";

export const PrivateRoute = () => {
	const { user, loading, isError } = useAuth();

	useEffect(() => {
		if (!loading) {
			if (!user) {
				console.log("we checked and user is still null");
			} else {
				console.log("we checked and found a user");
			}
		}
	}, [user, loading, isError]);

	return (
		<>
			{loading ? <LoadingScreen></LoadingScreen> : !isError && user ? <Outlet /> : <Navigate to="/login" />}
		</>
	);
};