import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { PlayerContext, PlayerProvider } from "../../contexts/game/PlayerContext";
import useMap from "../../hooks/context-hooks/game/UseMap";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import ScenarioModel from "./three-components/ScenarioModel";

/*
function ForwardCanvas({ children }) {
  const value = useContext(context)
  return (
    <Canvas>
      <context.Provider value={value}>
        {children}
      </context.Provider>
    </Canvas>
  )
}

function Test() {
  const value = useContext(context)
  console.log(value) // 123
  return null
}

const context = createContext()
function App() {
  return (
    <context.Provider value={123}>
      <ForwardCanvas>
        <Test />
      </ForwardCanvas>
    </context.Provider>
  )
}
*/

const World = () => {
	const { map } = useMap();
	const context = usePlayer();

	return (
		<div style={{height: "100vh", width: "100vw", zIndex: "-10", position: "absolute", top: 0, left: 0}}>
			<Canvas>
				<PlayerContext.Provider value={ context }>
					<Suspense fallback={null}>
						<ambientLight intensity={0.5}/>
						<spotLight position={[10,100,10]} angle={0.3}/>
						<OrbitControls/>
						{
							map !== null && <ScenarioModel map={map}/>
						}
					</Suspense>
				</PlayerContext.Provider>
			</Canvas>
		</div>
	);
};

export default World;