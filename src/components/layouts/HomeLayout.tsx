import { Drawer } from "@mui/material";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import HomeLayoutDrawer from "./HomeLayoutDrawer"

{ /* We use the GameLayout to share markup across all 
the Game related pages */}

const HomeLayout = () => {
    return (
        <div>
            <HomeLayoutDrawer>
                <Outlet />
            </HomeLayoutDrawer>
        </div>
    );
}

export default HomeLayout;
