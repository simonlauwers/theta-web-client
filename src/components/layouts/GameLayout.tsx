import { Routes, Route, Outlet, Link } from "react-router-dom";

{ /* We use the GameLayout to share markup across all 
the Game related pages */}

const GameLayout = () => {
    return (
        <div>
            <nav>
            </nav>

            <Outlet />
        </div>
    );
}

export default GameLayout;