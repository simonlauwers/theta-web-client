import axios from "axios";
import UserType from "../../types/UserType";

interface SignUpValues {
  displayName: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

const axiosFetch = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_BASE_URL
});

export async function login(params: LoginProps): Promise<UserType> {
  const response = await axiosFetch({ url: 'login', method: 'post', data: params });

  return response.data.data;
}

export async function signup(params: SignUpValues): Promise<SignUpValues> {
  const response = await axiosFetch({ url: 'register', method: 'post', data: params });

  return response.data.data;
}

export async function logout() {
  const response = await axiosFetch("logout");

  return response.data.data;
}



