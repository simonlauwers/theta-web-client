import React from "react";
import { Text } from "@react-three/drei";

interface DiceFaceProps {
    content : number;
    rotation : {x : number, y : number, z : number};
    position : {x : number, y : number, z : number};
  }
  
const DiceFace = (diceFaceProps : DiceFaceProps) => {
  return (
    <Text
      scale={[5, 5, 5]}
      color="black"
      anchorX="center"
      anchorY="middle"
      rotation={[diceFaceProps.rotation.x, diceFaceProps.rotation.y, diceFaceProps.rotation.z]}
      position={[diceFaceProps.position.x, diceFaceProps.position.y, diceFaceProps.position.z]}
    >
      {diceFaceProps.content}
    </Text>
  );
};

export default DiceFace;