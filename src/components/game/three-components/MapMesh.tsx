import React from "react";
import { Mesh } from "three";

interface MapMeshProps {
	mesh : Mesh
}

const MapMesh = (mapMeshProps : MapMeshProps) => {
	return (
		<mesh geometry={mapMeshProps.mesh.geometry}
			position={mapMeshProps.mesh.position}
		>
			<meshStandardMaterial color={"#212121"} />
		</mesh>
	);
};

export default MapMesh;