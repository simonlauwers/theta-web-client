import { Navigate, Route, RouteProps } from "react-router";
import useAuth from "../hooks/UseAuth";
import Login from "./login/Login";

interface Props {
    component: React.ComponentType
}

export const AuthenticatedRoute: React.FC<Props> = ({ component: RouteComponent }) => {
    const { user } = useAuth();

    if (user) {
        return <RouteComponent />
    }


    return <Navigate to="/auth/login" />
}

export default AuthenticatedRoute;