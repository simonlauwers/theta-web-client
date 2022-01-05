/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import NewPlayerType from "../../types/NewPlayerType";
import AttackType from "../../types/Game/AttackType";
import DraftType from "../../types/Game/DraftType";
import FortifyType from "../../types/Game/FortifyType";
import PollType from "../../types/Game/PollType";
import CreateGameType from "../../types/CreateGameType";

const api = axios.create({
	baseURL: location.hostname === "localhost" ? "http://localhost:8080/" : "/api/game/",
	withCredentials: false,
	headers: {
		"X-Authentication-Id": localStorage.getItem("userId")!
	}
});

export async function game(gameUuid: string) {
	const response = await api.get("game/games/" + gameUuid);
	return response.data;
}

export async function draft(draftValues: DraftType) {
	const response = await api.post("game/games/draft", draftValues);
	return response.data;
}

export async function getAllScenarios() {
	const response = await api.get("map/scenarios");
	return response.data;
}

export async function createGame(cgt: CreateGameType) {
	const response = await api.post("game/games/create", cgt);
	return response.data;
}

export async function addPlayer(player: NewPlayerType) {
	const response = await api.post("game/games/player", player);
	return response.data;
}

export async function getGame(id: string) {
	const response = await api.get("game/games/" + id);
	return response.data;
}

export async function pollGame(poll: PollType) {
	const response = await api.post("game/games", poll);
	return response;
}

export async function attack(attackValues: AttackType) {
	const response = await api.post("game/games/attack", attackValues);
	return response.data;
}

export async function fortify(fortifyValues: FortifyType) {
	const response = await api.post("game/games/fortify", fortifyValues);
	return response.data;
}

export async function initializeGame(gameId: string) {
	console.log(gameId);
	const response = await api.patch("game/games/" + gameId + "/initialize");
	return response.data;
}