/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CubicBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useState } from "react";
import { Vector3 } from "three/src/Three";

interface AttackLineProps {
    start : Vector3;
    end : Vector3;
}

const AttackLine = (attackLineProps : AttackLineProps) => {
    const [ frame, setFrame ] = useState<number>(0);
    const [ dashOffset,  setDashOffset ] = useState<number>(1);
    
    useFrame(() => {
		if(frame < 20) {
			setDashOffset(dashOffset - 0.05);
		}

		setFrame(frame+1);
    });

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
            attackLineProps.end.y + 0.1,
            ((attackLineProps.start.z - attackLineProps.end.z) / 2) + attackLineProps.end.z
        ]}
        color="#F44336"
        linewidth={3}
        dashOffset={dashOffset}
        dashed
        />
    );
};

export default AttackLine;