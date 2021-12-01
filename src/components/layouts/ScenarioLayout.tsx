import { Routes, Route, Outlet, Link } from "react-router-dom";

{ /* We use the ScenarioLayout to share markup across all 
the Scenario related pages */}

const ScenarioLayout = () => {
    return (
        <div>
            <nav>
            </nav>

            <Outlet />
        </div>
    );
}

export default ScenarioLayout;