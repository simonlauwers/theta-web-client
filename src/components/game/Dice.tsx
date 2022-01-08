import { MapControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import useDice from "../../hooks/context-hooks/game/UseDice";
import DiceMesh from "./three-components/DiceMesh";
import "./animations.css";

const Dice = () => {
    const {attackerRoll, defenderRoll, showingRoll} = useDice();

    const winningDice = getWinningDice(attackerRoll, defenderRoll);

    if(!showingRoll) {
        return(<></>);
    }

    return (
      <div style={{ height: "100vh", width: "100vw", zIndex: "-5", position: "absolute", top: 0, left: 0, animationName:"fade-in-out",
      animationDuration: "3s"}}>
        <Canvas style={{background:"rgba(0,0,0,0.5)"}}>
            <Suspense fallback={null}>
              <ambientLight intensity={0} />
              <spotLight position={[10, 100, 10]} angle={0.3} />

              <MapControls enableRotate={false} enablePan={false} minDistance={5} maxDistance={5} />
              <PerspectiveCamera position={[0, 1, 0.3]} fov={100}  makeDefault/>
              {attackerRoll.map((roll, index) => <DiceMesh key={index + "A"} result={roll} attacker={true} offset={index}
              winner={winningDice.filter(dice => dice.type === "A").map(dice => dice.index).includes(index)}/>)}
              {defenderRoll.map((roll, index) => <DiceMesh key={index + "D"} result={roll} attacker={false} offset={index}
              winner={winningDice.filter(dice => dice.type === "D").map(dice => dice.index).includes(index)}/>)}
            </Suspense>
        </Canvas>
      </div>
    );
};

export default Dice;

interface WinningDiceType {
  type: string;
  index: number;
}

function getWinningDice(attackerRoll : number[], defenderRoll : number[]) {
  const winners : WinningDiceType[] = [];

  for (let index = 0; index < defenderRoll.length; index++) {
    if(defenderRoll[index] < attackerRoll[index]) {
      winners.push({type: "A", index: index});
    } else {
      winners.push({type: "D", index: index});
    }
  }

  return winners;
}