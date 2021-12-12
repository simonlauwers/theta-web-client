import TerritoryType from "./TerritoryType";

export default interface PlayerTerritoryType {
    uuid: string;
    territory: TerritoryType;
    borderUuids: string[];
    troops: number;
};