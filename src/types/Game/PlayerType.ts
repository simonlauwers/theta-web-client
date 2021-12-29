/* eslint-disable semi */
import GameUserType from "./GameUserType";
import PlayerTerritoryType from "./PlayerTerritoryType";

export default interface PlayerType {
    uuid: string;
    name: string;
    playerColor: string;
    aiPlayer: boolean;
    troops: number;
    dead: boolean;
    playerTerritories: PlayerTerritoryType[];
    user : GameUserType;
};