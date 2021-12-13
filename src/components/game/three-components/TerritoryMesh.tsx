import React, { useState } from "react";
import { Mesh } from "three";
import { Text } from "@react-three/drei";
import TerritoryType from "../../../types/Game/TerritoryType";
import usePlayer from "../../../hooks/context-hooks/game/UsePlayer";
import parsePlayerColor from "../../../utils/game/PlayerColorParser";
import useTerritory from "../../../hooks/context-hooks/game/UseTerritory";


interface TerritoryMeshProps {
	mesh : Mesh
	territory : TerritoryType
}

const TerritoryMesh = (territoryMeshProps : TerritoryMeshProps) => {
	const [hover, setHover] = useState(false);
	const { players } = usePlayer();
	const { outgoingSelectedTerritory, incomingSelectedTerritory, setSelectedTerritory } = useTerritory();

	const player = players.filter(player => player.playerTerritories
		.filter(pt => pt.territory.uuid === territoryMeshProps.territory.uuid).length > 0)[0];

	const playerTerritory = players.filter(plr => plr.uuid === player.uuid)[0].playerTerritories
		.filter(playerTerritory => playerTerritory.territory.uuid === territoryMeshProps.territory.uuid)[0];


	return (
		<mesh geometry={territoryMeshProps.mesh.geometry}
			position={outgoingSelectedTerritory?.uuid === territoryMeshProps.territory.uuid ||
				incomingSelectedTerritory?.uuid === territoryMeshProps.territory.uuid ? [
				territoryMeshProps.mesh.position.x,
				territoryMeshProps.mesh.position.y + 0.02,
				territoryMeshProps.mesh.position.z
			] : territoryMeshProps.mesh.position}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
			onClick={() => setSelectedTerritory(territoryMeshProps.territory)}
		>
			<meshStandardMaterial color={determineColor(player.playerColor, hover)} />
			<Text
				scale={[0.8, 0.8, 0.8]}
				color="black"
				anchorX="center"
				anchorY="middle"
				rotation={[Math.PI / 2, Math.PI / 1, Math.PI / 1]}
				position={[0, 0.03, 0]}
			>
				{playerTerritory.troops}
			</Text>

		</mesh>
	);
};

export default TerritoryMesh;

function determineColor(color : string, hover : boolean) {
	const newColor = parsePlayerColor(color);
	return hover? newColor?.dark : newColor?.main;
}