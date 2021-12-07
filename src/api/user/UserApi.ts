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

interface ErrorType {
  message: string;
  status: number;
  timestamp: string;
}

export async function login(params: LoginProps): Promise<any> {

  try {
    return await api.post('login', params);
  } catch (e: any) {
    let error = e as unknown as ErrorType;
    console.log(e);
    console.log("errorType",error.timestamp);
    
    throw new Error(error.message);
  }

}

export async function signup(params: SignUpValues): Promise<SignUpValues> {
  const response = await api({ url: 'register', method: 'post', data: params });

  return response.data.data;
}

export async function logout() {
  const response = await api("logout");

  return response.data.data;
}

export async function whoami() {
  const response = await api.get('/whoami');
  return response.data as unknown as UserType;
}




