import React, { createContext, useEffect } from "react";
import UserType from "../types/UserType";
import { useMemo, useState, FC } from "react";
import { useQuery } from "react-query";
import { whoAmI } from "../api/user/UserApi";


export interface AuthContextType {
	user: UserType | null,
	setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
	loading: boolean,
	error: boolean
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setUser: () => { },
	loading: true,
	error: false
});

export const AuthProvider: FC = ({
	children
}) => {
	const [user, setUser] = useState<UserType | null>(null);
	const { data, status, isError, isLoading } = useQuery("whoami", whoAmI);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	useEffect(() => {
		if (!isLoading && !isError) {
			console.log("setting user in context");
			setUser(data);
			setLoading(false);
		}
		if (!isLoading && isError) {
			console.log("an error occured");
			setUser(null);
			setLoading(false);
			setError(true);
			setLoading(false);
		}
	}, [data]);

	return (
		<AuthContext.Provider value={{ user, setUser, loading, error }}>
			{children}
		</AuthContext.Provider>
	);

};



