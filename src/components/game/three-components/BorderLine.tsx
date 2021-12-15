import { QuadraticBezierLine } from "@react-three/drei";
import React from "react";
import { Vector3 } from "three/src/Three";

interface BorderLineProps {
    start : Vector3;
    end : Vector3;
}

const BorderLine = (borderLineProps : BorderLineProps) => {

    return (
        <QuadraticBezierLine 
        start={[
            borderLineProps.start.x,
            borderLineProps.start.y + 0.015,
            borderLineProps.start.z
        ]} 
        end={[
            borderLineProps.end.x,
            borderLineProps.end.y + 0.015,
            borderLineProps.end.z
        ]}
        color="black"
        linewidth={3}
        dashScale={20}
        dashed={true}
        />
    );
};

export default BorderLine;