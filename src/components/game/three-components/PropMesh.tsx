import React from "react";
import { Mesh } from "three";

interface PropMeshProps {
	mesh : Mesh
}

const PropMesh = (propMeshProps : PropMeshProps) => {
	return (
		<mesh geometry={propMeshProps.mesh.geometry}
			position={propMeshProps.mesh.position}
		>
			<meshStandardMaterial color={"#03A9F4"} />
		</mesh>
	);
};

export default PropMesh;