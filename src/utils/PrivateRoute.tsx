import React, { useEffect } from "react";
import useAuth from "../hooks/UseAuth";
import { Route, Navigate, Outlet } from "react-router-dom";

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
			{loading ? <div> loading</div> : !error && user ? <Outlet /> : <Navigate to="/login" />}
		</>
	);
};