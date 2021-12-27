import HomeLayoutDrawer from "./HomeLayoutDrawer";
import Particles from "react-tsparticles";
import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
	console.log("rendering homelayout.tsx");
	return (
		<div style={{ backgroundImage: "url(\"/media/photos/game-visuals/FireTemple.png\")", minHeight: "100vh" }}>
			<HomeLayoutDrawer>
				<Outlet />
			</HomeLayoutDrawer>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: 10,
					background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)"
				}} />
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: 10,
					background: "linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)"
				}} />
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
			/>


		</div>
	);
};

export default HomeLayout;
