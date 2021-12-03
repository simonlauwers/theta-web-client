import axios from "axios";
import UserType from "../../types/UserType";

const fetch = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_BASE_URL
});

export async function login(params: {
  email: string;
  password: string;
}): Promise<UserType> {
  const response = await fetch.post("/login", { params });

  return response.data.data;
}

export async function logout() {
  const response = await fetch.post("/logout");

  return response.data.data;
}



