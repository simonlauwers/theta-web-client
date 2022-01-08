import { MapControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { PhaseContext } from "../../contexts/game/PhaseContext";
import { PlayerContext } from "../../contexts/game/PlayerContext";
import { TerritoryContext } from "../../contexts/game/TerritoryContext";
import useMap from "../../hooks/context-hooks/game/UseMap";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import useTerritory from "../../hooks/context-hooks/game/UseTerritory";
import ScenarioModel from "./three-components/ScenarioModel";

const World = () => {
  const { map } = useMap();
  const playerContext = usePlayer();
  const territoryContext = useTerritory();
  const phaseContext = usePhase();

  return (
    <div style={{ height: "100vh", width: "100vw", zIndex: "-10", position: "absolute", top: 0, left: 0 }}>
      <Canvas style={{background:"linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1) 100%)"}}>
        <PlayerContext.Provider value={playerContext}>
          <TerritoryContext.Provider value={territoryContext}>
            <PhaseContext.Provider value={phaseContext}>
              <Suspense fallback={null}>
                <ambientLight intensity={0} />
                <spotLight position={[10, 100, 10]} angle={0.3} />
                <PerspectiveCamera position={[0, 1, 0.3]} fov={100} makeDefault/>
                <MapControls enableRotate={false} minDistance={0.3} maxDistance={1}/>

                {
                  map !== null && <ScenarioModel map={map} />
                }
              </Suspense>
            </PhaseContext.Provider>
          </TerritoryContext.Provider>
        </PlayerContext.Provider>
      </Canvas>
    </div>
  );
};


export default World;