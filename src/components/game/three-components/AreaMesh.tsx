import React from "react";
import { Mesh } from "three/src/objects/Mesh";
import AreaType from "../../../types/Game/AreaType";

interface AreaMeshProps {
	mesh : Mesh;
	area : AreaType;
}

const AreaMesh = (areaMeshProps : AreaMeshProps) => {
	return (
		<mesh geometry={areaMeshProps.mesh.geometry}
			position={areaMeshProps.mesh.position}
		>
			<meshStandardMaterial color={"#F44336"} />
		</mesh>
	);
};

export default AreaMesh;