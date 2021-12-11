import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

const World = () => {
	return (
		<div style={{height: "100vh", width: "100vw", zIndex: "-10", position: "absolute", top: 0, left: 0}}>
			<Canvas>
				<Suspense fallback={null}>
					<ambientLight intensity={0.5}/>
					<spotLight position={[10,100,10]} angle={0.3}/>
					<OrbitControls/>
					<Box></Box>
				</Suspense>
			</Canvas>
		</div>
	);
};

export default World;