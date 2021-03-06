/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createContext, useEffect } from "react";
import UserType from "../types/UserType";
import { useState, FC } from "react";
import { useQuery } from "react-query";
import { whoAmI } from "../api/user/UserApi";


export interface AuthContextType {
	user: UserType | null,
	setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
	loading: boolean,
	isError: boolean,
	refetch: () => void
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setUser: () => { },
	loading: true,
	isError: false,
	refetch: () => { }
});

export const AuthProvider: FC = ({
	children
}) => {
	const [user, setUser] = useState<UserType | null>(null);
	const { data, isError, isLoading, refetch } = useQuery("whoami", whoAmI);
	const [loading, setLoading] = useState<boolean>(true);
	/* 	const [error, setError] = useState<boolean>(false);
	 */
	useEffect(() => {
		if (!isLoading && !isError) {
			setUser(data);
			setLoading(false);
			localStorage.setItem("userId", data.userId);
		}
		if (!isLoading && isError) {
			setUser(null);
			setLoading(false);
		}
	}, [data, isError, user]);

	return (
		<AuthContext.Provider value={{ user, setUser, loading, isError, refetch }}>
			{children}
		</AuthContext.Provider>
	);

};



