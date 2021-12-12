import TerritoryBorderType from "./TerritorryBorderType";

export default interface TerritoryType {
    uuid: string,
    name: string,
    territoryBorders: TerritoryBorderType[]
};