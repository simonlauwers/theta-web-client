import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_GAME_API_BASE_URL
});

export async function game(gameUuid: string) {
	const response = await api.get("game/game/" + gameUuid);
	return response.data;
}

export async function getAllScenarios() {
	const response = await api.get("map/allScenarios");
	return response.data;
}



