/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import DiceFace from "./DiceFaceMesh";

interface DiceProps {
    result : number;
    attacker : boolean;
    offset : number;
    winner : boolean;
}
  
interface Position {
  x : number;
  y : number;
  z : number;
}
  
function getDiceLayout(result : number) {
  switch (result) {
    case 1 : return [1, 2, 3, 4, 5, 6];
    case 2 : return [2, 3, 4, 5, 6, 1];
    case 3 : return [3, 4, 5, 6, 1, 2];
    case 4 : return [4, 5, 6, 1, 2, 3];
    case 5 : return [5, 6, 1, 2, 3, 4];
    case 6 : return [6, 1, 2, 3, 4, 5];
  }
}
  
function getOffset(offset : number, attacker : boolean) {
  const direction = attacker? -8 : 8;

  switch (offset) {
    case 0 : return {x : direction + Math.random() - 0.5, y : 0, z : -1 + Math.random() - 0.5};
    case 1 : return {x : direction + Math.random() - 0.5, y : 0, z : 1 + Math.random() - 0.5};
    case 2 : return {x : direction + Math.random() - 0.5, y : 0, z : -3 + Math.random() - 0.5};
  }
}
  
const DiceMesh = (diceProps : DiceProps) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [frame, setFrame] = useState<number>(0);
  const [diceLayout, setDiceLayout] = useState<number[]>([]);
  const [position, setPosition] = useState<Position>({x : 0, y : 0, z : 0});

  useEffect(() => {
    setDiceLayout(getDiceLayout(diceProps.result)!);
    setPosition(getOffset(diceProps.offset, diceProps.attacker)!);
    setFrame(-Math.floor(Math.random() * 15));
  }, []);

  useFrame(() => {
    if (frame <= 0) {
      mesh.current.visible = false;
      mesh.current.position.x = position!.x;
      mesh.current.position.y = 1;
    } else {
      mesh.current.visible = true;

      if(frame < 20) {
        mesh.current.position.y -= 0.05;
      } else if (frame < 30) {
        mesh.current.position.y += 0.03;
      } else if (frame < 40) {
        mesh.current.position.y -= 0.03;
      }
  
      if (frame < 60) {
        mesh.current.rotation.z += diceProps.attacker ? -0.105 : 0.105;
        mesh.current.position.x += diceProps.attacker ? 0.1 : -0.1;

        if (frame % 20 < 10) {
          mesh.current.rotation.y += 0.01;
        } else {
          mesh.current.rotation.y -= 0.01;
        }

      } else if (diceProps.winner && frame > 60 && frame < 90) {
        mesh.current.scale.x += 0.01;
        mesh.current.scale.y += 0.01;
        mesh.current.scale.z += 0.01;
      }

    }
    setFrame(frame+1);
  });

  return (
    <mesh
      ref={mesh}
      position={[position!.x, position!.y, position!.z]}
      visible={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshToonMaterial color={diceProps.attacker? "#E76F51" : "#2A9D8F"} />
      <DiceFace content={diceLayout![0]!} rotation={{x : Math.PI / 2, y : Math.PI / 1, z : Math.PI / 1}} position={{x : 0, y : 0.51, z : 0}}/>
      <DiceFace content={diceLayout![1]!} rotation={{x : Math.PI / 1, y : Math.PI / 2, z : Math.PI / 2}} position={{x : 0.51, y : 0, z : 0}}/>
      <DiceFace content={diceLayout![2]!} rotation={{x : Math.PI / 1, y : Math.PI / 1, z : Math.PI / 1}} position={{x : 0, y : 0, z : 0.51}}/>
      <DiceFace content={diceLayout![3]!} rotation={{x : 0, y : Math.PI / 1, z : Math.PI / 1}} position={{x : 0, y : 0, z : -0.51}}/>
      <DiceFace content={diceLayout![4]!} rotation={{x : Math.PI / 2, y : -Math.PI / 2, z : Math.PI / 1}} position={{x : -0.51, y : 0, z : 0}}/>
      <DiceFace content={diceLayout![5]!} rotation={{x : Math.PI / 2, y : 0, z : Math.PI / 1}} position={{x : 0, y : -0.51, z : 0}}/>
    </mesh>
  );
};

export default DiceMesh;