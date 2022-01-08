/* eslint-disable semi */
import TerritoryBorderType from "./TerritorryBorderType";

export default interface TerritoryType {
    uuid: string,
    name: string,
    resourceIndex: number,
    territoryBorders: TerritoryBorderType[]
};