/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";

const api = axios.create({
	baseURL: location.hostname === "localhost" ? "http://localhost:5051/" : "/api/stats/",
});

export async function getHoursPlayed(playerId: string | undefined) {
	const response = await api.get("https://analytics.theta-risk.com/stats/user/" + playerId + "/hours");
	return response.data;
}

