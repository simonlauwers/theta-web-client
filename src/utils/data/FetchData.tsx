import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_GAME_API_BASE_URL
});


const fetchData = async (endpoint: string) => {
  const result = await api.get(endpoint);
  return result.data;
}

export default fetchData