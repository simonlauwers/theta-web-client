import TerritoryType from "./TerritoryType";

export default interface AreaType {
    uuid: string,
    name: string,
    bonusTroops: number,
    resourceIndex: number,
    territories: TerritoryType[]
};