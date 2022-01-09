/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";

const api = axios.create({
	baseURL: location.hostname === "localhost" ? "http://localhost:5051/" : "/api/stats/",
	withCredentials: true,
});

export async function getHoursPlayed(playerId: string) {
	const response = await api.get("user/" + playerId + "/hours");
	return response.data;
}

