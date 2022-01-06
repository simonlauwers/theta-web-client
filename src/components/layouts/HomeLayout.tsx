import HomeLayoutDrawer from "./HomeLayoutDrawer";
import Particles from "react-tsparticles";
import React from "react";
import { Outlet } from "react-router-dom";
import { backgroundColor } from "../../theme/colors";

const HomeLayout = () => {
	return (
		<div style={{ minHeight: "100vh", backgroundColor: backgroundColor.main }}>
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

			<div style={{ zIndex: -100 }}>
				<Particles options={{
					background: {
						image: "linear-gradient(rgba(68, 2, 4, 0.25), rgba(0, 0, 0, 0.10))",
					},
					fpsLimit: 40,
					interactivity: {
						events: {
							resize: true,
						},
					},
					particles: {
						number: {
							value: 80,
							density: {
								enable: true,
								area: 800,
							},
						},
						color: {
							value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
						},
						opacity: {
							value: 0.5,
							random: true,
						},
						size: {
							value: 3,
							random: true,
						},
						move: {
							enable: true,
							speed: 1,
							random: false,
						},
					},
					detectRetina: true,
				}}
				/>

			</div>


		</div>
	);
};

export default HomeLayout;
