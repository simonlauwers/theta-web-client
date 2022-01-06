/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


interface DifferenceTextMeshProps {
    difference: number;
}

const DifferenceTextMesh = (differenceTextMeshProps : DifferenceTextMeshProps) => {
    const dif = useRef<THREE.Mesh>(null!);
    useFrame(() => (dif.current.position.y += 0.001));

    const color = differenceTextMeshProps.difference > 0? "green" : "red";

    return (
            <Text
                ref={dif}
                scale={[0.8, 0.8, 0.8]}
                color={color}
                anchorX="center"
                anchorY="middle"
                outlineColor={"FFFFFF"}
				outlineWidth={0.01}
                rotation={[Math.PI / 2, Math.PI / 1, Math.PI / 1]}
                position={[0, 0, 0]}
            >
					{differenceTextMeshProps.difference}
			</Text>
    );
};

export default DifferenceTextMesh;
