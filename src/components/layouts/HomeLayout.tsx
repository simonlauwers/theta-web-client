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
        loadFirePreset(main);
    };

    const options = {
        preset: "fire",
    };

    return (

        <div style={{ backgroundImage: `url("/media/game-visuals/FireTemple.png")`, minHeight: '100vh' }}>
            <HomeLayoutDrawer>
                <Outlet />
            </HomeLayoutDrawer>
            <Particles options={{
                background: {
                    color: {
                        value: "",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                        },
                        onHover: {
                            enable: true,
                            mode: "bubble",
                        },
                        resize: true,
                    },
                    modes: {
                        bubble: {
                            distance: 250,
                            duration: 8,
                            opacity: 0.8,
                            size: 6,
                        },
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 40,
                            duration: 5,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 2,
                    },
                    collisions: {
                        enable: false,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                        value: 60,
                    },
                    opacity: {
                        value: 0.1,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        random: true,
                        value: 5,
                    },
                },
                detectRetina: true,
            }}
                init={particlesInit} />
        </div>
    );
}

export default HomeLayout;
