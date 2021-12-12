import ScenarioType from "./ScenarioType";
import PlayerType from "./PlayerType";

export default interface GameType {
    uuid : string;
	gameState : string;
	gamePhase :string;
	players : PlayerType[];
	currentPlayer: PlayerType;
	scenario : ScenarioType;
	gameCode : string;
};