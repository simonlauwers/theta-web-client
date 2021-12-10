import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_GAME_API_BASE_URL
});

export async function post<T>(endpoint: string, body: T) {
  const response = await api.post(endpoint, body);
  return response;
}

export async function get(endpoint: string) {
  const response = await api.get(endpoint)
  return response;
}

export async function patch(endpoint: string) {
  const response = await api.patch(endpoint)
  return response;
}





