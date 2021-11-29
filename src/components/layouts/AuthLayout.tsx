import { Routes, Route, Outlet, Link } from "react-router-dom";

{ /* We use the AuthLayout to share markup across all 
the Auth related pages like log-in */}

const AuthLayout = () => {
    return (
        <div>
            <nav>
            </nav>

            <Outlet />
        </div>
    );
}

export default AuthLayout;