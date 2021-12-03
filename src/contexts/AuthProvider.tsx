import { ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import UserType from "../types/UserType";
import * as sessionsApi from "../api/sessions/sessions";
import * as usersApi from "../api/users/users";

import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [user, setUser] = useState<UserType>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    const login = async (email: string, password: string) => {
        setLoading(true);

        try {
            const user = await sessionsApi.login({ email, password });
            setUser(user);
            navigate("/home");
        } catch (error) {
            setError(error);
        }

        setLoading(false);
    }

    const signUp = async (email: string, displayName: string, password: string) => {
        setLoading(true);

        try {
            const user = await usersApi.signup({ email, displayName, password });
            setUser(user);
            navigate("/auth/login");
        } catch (error) {
            setError(error);
        }

        setLoading(false);
    }

    const logout = () => {
        setLoading(true);

    }

    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            signUp,
            logout,
        }),
        [user, loading, error]
    );


    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );

}

