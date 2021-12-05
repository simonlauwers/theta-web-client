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

const api = axios.create({
  // baseURL: process.env.REACT_APP_AUTH_API_BASE_URL
  baseURL: 'http://localhost:8080',
  withCredentials: true

});

export async function login(params: LoginProps): Promise<UserType> {
  //const response = await axiosFetch({ url: 'login', method: 'post', data: params });
  const response = await api.post('/login', params);
  console.log(response.data);

  return response.data.data;
}

export async function signup(params: SignUpValues): Promise<SignUpValues> {
  const response = await api({ url: 'register', method: 'post', data: params });

  return response.data.data;
}

export async function logout() {
  const response = await api("logout");

  return response.data.data;
}

export async function whoami(){
  const response = await api.get('/whoami');
  console.log(response.data);
}

whoami();



