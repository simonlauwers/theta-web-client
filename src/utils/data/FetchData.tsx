import axios from "axios";

const fetch = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API_BASE_URL;
  });


const fetchData = async (endpoint: string) => {
    const result = await fetch.get(endpoint);
    return result.data;
}

export default fetchData