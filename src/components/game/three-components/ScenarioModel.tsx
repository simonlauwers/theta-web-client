/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { Mesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import MapType from "../../../types/Game/MapType";
import AreaMesh from "./AreaMesh";
import LineModel from "./LineModel";
import MapMesh from "./MapMesh";
import PropMesh from "./PropMesh";
import TerritoryMesh from "./TerritoryMesh";

interface ScenarioModelProps {
	map: MapType;
}

interface MetaDataType {
	props: number;
	maps: number;
	areas: number;
	territories: number;
}

const ScenarioModel = (scenarioModelProps: ScenarioModelProps) => {
	const group = useRef();

	const { nodes } = useLoader(GLTFLoader, "/models/" + scenarioModelProps.map.resource + ".glb");
	const metaData = extractMetaData(nodes);

	const propMeshes = extractMeshes(nodes, "P", metaData.props);
	const mapMeshes = extractMeshes(nodes, "M", metaData.maps);
	const areaMeshes = extractMeshes(nodes, "A", metaData.areas);
	const territoryMeshes = extractMeshes(nodes, "T", metaData.territories);

	return (
		<group ref={group} dispose={null}>
			{
				propMeshes.map((propMesh) => (
					<PropMesh key={propMesh.name} mesh={propMesh as Mesh} />
				))
			}
			{
				mapMeshes.map((mapMesh) => (
					<MapMesh key={mapMesh.name} mesh={mapMesh as Mesh} />
				))
			}
			{
				areaMeshes.map((areaMesh) => (
					<AreaMesh key={areaMesh.name} mesh={areaMesh as Mesh}
						area={scenarioModelProps.map.areas
							.find(area => area.resourceIndex === parseInt(areaMesh.name.slice(1)))!} />
				))
			}
			{
				territoryMeshes.map((territoryMesh) => (
					<TerritoryMesh key={territoryMesh.name} mesh={territoryMesh as Mesh}
						territory={scenarioModelProps.map.areas.flatMap(area => area.territories)
							.find(territory => territory.resourceIndex === parseInt(territoryMesh.name.slice(1)))!} />
				))
			}
			
			<LineModel territories={scenarioModelProps.map.areas.flatMap(area => area.territories)} territoryMeshes={territoryMeshes}/>
		</group>
	);
};

export default ScenarioModel;

function extractMetaData(data: { [name: string]: Object3D<THREE.Event>; }) {
	const metaData: MetaDataType = { props: 0, maps: 0, areas: 0, territories: 0 };

	const convertData = data["META"] as any;
	const metaString: string = convertData.material.name;

	metaData.props = parseInt(metaString.split("P")[1].split("_")[0]);
	metaData.maps = parseInt(metaString.split("M")[1].split("_")[0]);
	metaData.areas = parseInt(metaString.split("A")[1].split("_")[0]);
	metaData.territories = parseInt(metaString.split("T")[1].split("_")[0]);

	return metaData;
}

function extractMeshes(data: { [name: string]: Object3D<THREE.Event>; }, prefix: string, amount: number) {
	const meshes: Object3D<THREE.Event>[] = [];

	for (let index = 0; index < amount; index++) {
		meshes.push(data[prefix + index]);
	}

	return meshes;
}

