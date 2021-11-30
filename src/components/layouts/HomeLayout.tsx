import { Drawer } from "@mui/material";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import HomeLayoutDrawer from "./HomeLayoutDrawer"
import Particles from "react-tsparticles";
import { Container, Main } from "react-tsparticles"
import { loadFirePreset } from "tsparticles-preset-fire";

{ /* We use the GameLayout to share markup across all 
the Game related pages */}

const HomeLayout = () => {
    const particlesInit = (main: Main) => {
        console.log(main);
        loadFirePreset(main);

        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    };

    const options = {
        preset: "fire",
      };
  
    return (
        
        <div id="particles">
            <Particles id="tsparticles" options={options} init={particlesInit} />
            <div style={{ backgroundImage: `url("/media/game-visuals/FireTemple.png")`, minHeight: '100vh' }}>
                <HomeLayoutDrawer>
                    <Outlet />
                </HomeLayoutDrawer>
            </div>
        </div>
    );
}

export default HomeLayout;
