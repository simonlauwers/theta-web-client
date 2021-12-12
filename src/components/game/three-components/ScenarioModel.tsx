import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import MapType from "../../../types/Game/MapType";

interface ScenarioModelProps {
	map : MapType;
}

const ScenarioModel = (scenarioModelProps : ScenarioModelProps) => {
	const group = useRef();

	const { nodes } = useLoader(GLTFLoader, "/models/" + scenarioModelProps.map.resource + ".glb");
    
	console.log(nodes);

	return (
		<group ref={group} dispose={null}>
          
		</group>
	);
};

export default ScenarioModel;