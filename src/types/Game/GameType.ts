/* eslint-disable semi */
import ScenarioType from "./ScenarioType";
import PlayerType from "./PlayerType";
import DiceRollType from "./DiceRollType";

export default interface GameType {
    uuid : string;
	gameState : string;
	gamePhase :string;
	players : PlayerType[];
	currentPlayer: PlayerType;
	scenario : ScenarioType;
	gameCode : string;
	updateTimestamp : string;
	lastRoll : DiceRollType;
};