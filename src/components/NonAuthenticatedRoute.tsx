import { Navigate, Route, RouteProps } from "react-router";
import useAuth from "../hooks/UseAuth";
import Login from "./login/Login";

interface Props {
    component: React.ComponentType
}

export const NonAuthenticatedRoute: React.FC<Props> = ({ component: RouteComponent }) => {
    const { user } = useAuth();

    if (!user) {
        return <RouteComponent />
    }


    return <Navigate to="/home" />
}

export default NonAuthenticatedRoute;