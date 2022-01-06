/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosResponse } from "axios";
import NewPlayerType from "../../types/NewPlayerType";
import AttackType from "../../types/Game/AttackType";
import DraftType from "../../types/Game/DraftType";
import FortifyType from "../../types/Game/FortifyType";
import PollType from "../../types/Game/PollType";
import AiType from "../../types/Game/AiType";

const api = axios.create({
	baseURL: location.hostname === "localhost" ? "http://localhost:8080/" : "/api/game/",
	withCredentials: false,
	headers: {
		"X-Authentication-Id" : localStorage.getItem("userId")!
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

export async function createGame(id: string) {
	const scenario = { scenarioId: id };
	const response = await api.post("game/games/create", scenario);
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
	const response = await api.patch("game/games/" + gameId + "/initialize");
	return response.data;
}

export async function callAi(aiProps : AiType) {
	let response : AxiosResponse<any, any>;
	if(aiProps.phase === "DRAFT") {
		response = await api.patch("game/ai/draft/" + aiProps.uuid);
	} else if (aiProps.phase === "ATTACK") {
		response = await api.patch("game/ai/attack/" + aiProps.uuid);
	} else {
		response = await api.patch("game/ai/fortify/" + aiProps.uuid);
	}
	return response.data;
}

export async function leaveGame(gameId: string) {
	const response = await api.delete("game/games/" + gameId + "/leave");
	return response.data;
}