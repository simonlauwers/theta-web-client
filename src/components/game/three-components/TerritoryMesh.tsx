/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { Text } from "@react-three/drei";
import TerritoryType from "../../../types/Game/TerritoryType";
import usePlayer from "../../../hooks/context-hooks/game/UsePlayer";
import parsePlayerColor from "../../../utils/game/PlayerColorParser";
import useTerritory from "../../../hooks/context-hooks/game/UseTerritory";
import DifferenceTextMesh from "./DifferenceTextMesh";
import { useFrame } from "@react-three/fiber";

interface TerritoryMeshProps {
	mesh : Mesh
	territory : TerritoryType
}

const TerritoryMesh = (territoryMeshProps : TerritoryMeshProps) => {
	const mesh = useRef<THREE.Mesh>(null!);
	const loaded = useRef(false);
	
	const { players } = usePlayer();
	const { outgoingSelectedTerritory, incomingSelectedTerritory, setSelectedTerritory } = useTerritory();

	const player = players.filter(player => player.playerTerritories
		.filter(pt => pt.territory.uuid === territoryMeshProps.territory.uuid).length > 0)[0];

	const playerTerritory = players.filter(plr => plr.uuid === player.uuid)[0].playerTerritories
		.filter(playerTerritory => playerTerritory.territory.uuid === territoryMeshProps.territory.uuid)[0];

	const [ frame, setFrame ] = useState<number>(60);
	const [ hover, setHover ] = useState(false);
	const [ selected, setSelected ] = useState(false);
	const [ troops, setTroops ] = useState<number>(playerTerritory.troops);
	const [ difference, setDifference ] = useState<number>(0);


	useFrame(() => {
		const direction = selected ? 0.004 : -0.004;

		if(frame === 0) {
			mesh.current.position.y = selected ? 0 : 0.02;
		}

		if(frame < 5) {
			mesh.current.position.y += direction;
		}

		
		setFrame(frame+1);
	});

	useEffect(() => {
		if(loaded.current) {
			setFrame(0);
		}
		loaded.current = true;
	}, [selected]);

	useEffect(() => {
		setSelected( outgoingSelectedTerritory?.uuid === territoryMeshProps.territory.uuid || 
			incomingSelectedTerritory?.uuid === territoryMeshProps.territory.uuid);
	}, [outgoingSelectedTerritory, incomingSelectedTerritory]);

	useEffect(() => {
		if (playerTerritory.troops !== troops) {
			setDifference(playerTerritory.troops - troops);
			setTroops(playerTerritory.troops);
			setTimeout(() => {setDifference(0);}, 3000);
		}
	}, [playerTerritory]);

	return (
		<mesh 
			ref={mesh}
			geometry={territoryMeshProps.mesh.geometry}
			position={territoryMeshProps.mesh.position}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
			onClick={() => setSelectedTerritory(territoryMeshProps.territory)}
		>
			<meshToonMaterial color={determineColor(player.playerColor, hover)} />

			<Text
				scale={[0.8, 0.8, 0.8]}
				color="black"
				anchorX="center"
				anchorY="middle"
				outlineColor={parsePlayerColor(player.playerColor)?.main}
				outlineWidth={0.01}
				rotation={[Math.PI / 2, Math.PI / 1, Math.PI / 1]}
				position={[0, 0.03, 0]}
			>
				{troops}
			</Text>
			
			{difference !== 0 &&
				<DifferenceTextMesh difference={difference}/>
			}

		</mesh>
	);
};

export default TerritoryMesh;

function determineColor(color : string, hover : boolean) {
	const newColor = parsePlayerColor(color);
	return hover? newColor?.dark : newColor?.main;
}