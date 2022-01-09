/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React from "react";
import { Object3D } from "three/src/Three";
import usePhase from "../../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../../hooks/context-hooks/game/UsePlayer";
import useTerritory from "../../../hooks/context-hooks/game/UseTerritory";
import TerritoryType from "../../../types/Game/TerritoryType";
import AttackLine from "./AttackLine";
import BorderLine from "./BorderLine";

interface LineModelProps {
    territories: TerritoryType[];
    territoryMeshes: Object3D<THREE.Event>[];
}

const LineModel = (lineModelProps: LineModelProps) => {
    const { outgoingSelectedTerritory, incomingSelectedTerritory } = useTerritory();
    const { phase } = usePhase();
    const { currentPlayer } = usePlayer();

    return (
        <>
            {
                lineModelProps.territories
                    .map((territory) => {
                        const territoryBorders = territory.territoryBorders.filter(tb => !tb.physicalBorder);

                        return territoryBorders.map(territoryBorder => (
                            <BorderLine key={territoryBorder.uuid} start={lineModelProps.territoryMeshes.filter(mesh => mesh.name === "T" + territory.resourceIndex)[0].position}
                                end={lineModelProps.territoryMeshes.filter(mesh => mesh.name === "T" + territoryBorder.borderingTerritory.resourceIndex)[0].position} />
                        ));
                    })
            }
            {
                outgoingSelectedTerritory !== null && phase === "ATTACK" && incomingSelectedTerritory !== null ?
                    <AttackLine start={lineModelProps.territoryMeshes.filter(mesh => mesh.name === "T" + outgoingSelectedTerritory.resourceIndex)[0].position}
                        end={lineModelProps.territoryMeshes.filter(mesh => mesh.name === "T" + incomingSelectedTerritory.resourceIndex)[0].position} />
                    :
                    outgoingSelectedTerritory !== null && phase === "ATTACK" && outgoingSelectedTerritory.territoryBorders
                        .filter(territoryBorder => currentPlayer?.playerTerritories.map(pt => pt.territory).filter(t => t.uuid === territoryBorder.borderingTerritory.uuid).length! <= 0).map((territoryBorder) => (
                            <AttackLine key={territoryBorder.uuid + "attack"} start={lineModelProps.territoryMeshes.filter(mesh => mesh.name === "T" + outgoingSelectedTerritory.resourceIndex)[0].position}
                                end={lineModelProps.territoryMeshes.filter(mesh => mesh.name === "T" + territoryBorder.borderingTerritory.resourceIndex)[0].position} />
                        ))
            }
        </>
    );
};

export default LineModel;