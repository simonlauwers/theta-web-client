import React from "react";
import { Mesh, MeshBasicMaterial } from "three";

interface PropMeshProps {
	mesh : Mesh
}

const PropMesh = (propMeshProps : PropMeshProps) => {

	const material = propMeshProps.mesh.material as MeshBasicMaterial;

	return (
		<mesh geometry={propMeshProps.mesh.geometry}
			position={propMeshProps.mesh.position}
		>
			<meshToonMaterial color={material.color}/>
		</mesh>
	);
};

export default PropMesh;