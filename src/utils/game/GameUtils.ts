import PlayerType from "../../types/game/PlayerType";
import TerritoryType from "../../types/game/TerritoryType";

export function validatePlayerTerritory(player: PlayerType, territory: TerritoryType) {
    return player.playerTerritories.filter(pt => pt.territory.uuid === territory.uuid).length > 0;
}

export function validateBorder(outgoingTerritory: TerritoryType, incommingTerritory: TerritoryType) {
    return outgoingTerritory.territoryBorders.filter(tb => tb.borderingTerritory.uuid === incommingTerritory.uuid).length > 0;
}

export function getAvailableTroops(player: PlayerType, territory: TerritoryType) {
    return player.playerTerritories.filter(pt => pt.territory.uuid === territory.uuid)[0].troops;
}