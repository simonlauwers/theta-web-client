import { CubicBezierLine } from "@react-three/drei";
import React from "react";
import { Vector3 } from "three/src/Three";

interface AttackLineProps {
    start : Vector3;
    end : Vector3;
}

const AttackLine = (attackLineProps : AttackLineProps) => {

    return (
        <CubicBezierLine 
        start={[
            attackLineProps.start.x,
            attackLineProps.start.y + 0.03,
            attackLineProps.start.z
        ]} 
        end={[
            attackLineProps.end.x,
            attackLineProps.end.y + 0.03,
            attackLineProps.end.z
        ]}
        midA={[
            ((attackLineProps.start.x - attackLineProps.end.x) / 2) + attackLineProps.end.x,
            attackLineProps.start.y + 0.1,
            ((attackLineProps.start.z - attackLineProps.end.z) / 2) + attackLineProps.end.z
        ]}
        midB={[
            ((attackLineProps.start.x - attackLineProps.end.x) / 2) + attackLineProps.end.x,
            attackLineProps.start.y + 0.1,
            ((attackLineProps.start.z - attackLineProps.end.z) / 2) + attackLineProps.end.z
        ]}
        color="red"
        linewidth={3}
        />
    );
};

export default AttackLine;