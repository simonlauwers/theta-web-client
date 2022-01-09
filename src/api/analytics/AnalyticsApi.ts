/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosResponse } from "axios";

const api = axios.create({
	baseURL: location.hostname === "localhost" ? "http://localhost:8080/" : "/api/stats/",
	withCredentials: true,
	headers: {
		"X-Authentication-Id": localStorage.getItem("userId")!
	}
});

export async function hoursPlayed(playerId: string) {
	const response = await api.get("user/" + playerId + "/hours");
	return response.data;
}

