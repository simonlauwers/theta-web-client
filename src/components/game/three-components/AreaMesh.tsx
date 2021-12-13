import React from "react";
import { Mesh } from "three/src/objects/Mesh";
import usePlayer from "../../../hooks/context-hooks/game/UsePlayer";
import AreaType from "../../../types/Game/AreaType";
import parsePlayerColor from "../../../utils/game/PlayerColorParser";

interface AreaMeshProps {
	mesh : Mesh;
	area : AreaType;
}

const AreaMesh = (areaMeshProps : AreaMeshProps) => {
	const { players } = usePlayer();

	const territories = areaMeshProps.area.territories.map(territory => territory.uuid);

	const player = players.filter(player => player.playerTerritories
		.filter(pt => territories.includes(pt.territory.uuid)).length === territories.length)[0];

	return (
		<mesh geometry={areaMeshProps.mesh.geometry}
			position={areaMeshProps.mesh.position}
		>
			<meshStandardMaterial color={ player !== undefined ? parsePlayerColor(player.playerColor)?.light : "#000000"} />
		</mesh>
	);
};

export default AreaMesh;