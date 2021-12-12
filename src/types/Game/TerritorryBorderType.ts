"territoryBorders";
import TerritoryType from "./TerritoryType";

export default interface TerritoryBorderType {
    uuid: string,
    borderingTerritory: TerritoryType,
    physicalBorder: boolean
};