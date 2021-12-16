import axios from "axios";
import NewPlayerType from "../../types/NewPlayerType";
import AttackType from "../../types/Game/AttackType";
import DraftType from "../../types/Game/DraftType";
import FortifyType from "../../types/Game/FortifyType";

const api = axios.create({
	baseURL: process.env.REACT_APP_GAME_API_BASE_URL
});

export async function game(gameUuid: string) {
	const response = await api.get("game/game/" + gameUuid);
	return response.data;
}

export async function draft(draftValues: DraftType) {
	const response = await api.post("game/executeDraftPhase", draftValues);
	return response.data;
}

export async function getAllScenarios() {
	const response = await api.get("map/allScenarios");
	return response.data;
}

export async function createGame(id: string) {
	const scenario = { scenarioId: id };
	const response = await api.post("game/createGame", scenario);
	return response.data;
}

export async function addPlayer(player: NewPlayerType) {
	const response = await api.post("game/addPlayerToGame", player);
	return response.data;
}

export async function getGame(id: string) {
	console.log("game/game/" + id);
	const response = await api.get("game/game/" + id);
	return response.data;
}

export async function attack(attackValues: AttackType) {
	const response = await api.post("game/executeAttackPhase", attackValues);
	return response.data;
}

export async function fortify(fortifyValues: FortifyType) {
	const response = await api.post("game/executeFortifyPhase", fortifyValues);
	return response.data;
}
