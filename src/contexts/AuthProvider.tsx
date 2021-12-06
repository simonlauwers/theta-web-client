import { ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import UserType from "../types/UserType";
import * as userApi from "../api/user/UserApi";
import AuthContext from "./AuthContext";


const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [user, setUser] = useState<UserType>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    const navigate = useNavigate();
    const location = useLocation();

    /*
     * Clears the errors each time the current URL changes.
     */
    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    useEffect(() => {
        setTimeout(() => {
            userApi.whoami()
            .then((user: UserType) => setUser(user))
            .catch((error: any) => { alert(error) })
            .finally(() => setLoadingInitial(false));
        }, 2000)
      
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const user = await userApi.login({ email, password });
            console.log(user);
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
            const user = await userApi.signup({ email, displayName, password });
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

    /*
    * Make the provider update only when it should.
    * We want to keep things very performant :-)
    */
    const memoedValue = {
        user,
        loading,
        loadingInitial,
        error,
        login,
        signUp,
        logout,
    }


    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;

