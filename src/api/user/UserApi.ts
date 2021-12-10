import axios from "axios";
import EmailType from "../../types/EmailType";
import LoginType from '../../types/LoginType'
import RegisterType from '../../types/RegisterType'
import ResetPasswordType from "../../types/ResetPasswordType";
import TokenType from "../../types/TokenType";

const api = axios.create({
  baseURL: process.env.REACT_APP_USER_API_BASE_URL,
  withCredentials: true
});

export async function login(loginValues: LoginType) {
  const response = await api.post("/login", loginValues)
  return response.data;
}

export async function register(registerValues: RegisterType) {
  const response = await api.post("/register", registerValues)
  return response.data;
}

export async function confirmAccount(token: TokenType) {
  const response = await api.post("/confirm-account", token)
  return response.data;
}

export async function sendForgotPasswordEmail(email: EmailType) {
  const response = await api.post("/send-forgot-password-email", email)
  return response.data;
}

export async function resetPassword(resetPasswordValues: ResetPasswordType) {
  console.log("resetting password")
  console.log(resetPasswordValues)
  const response = await api.post("/reset-password", resetPasswordValues)
  return response.data;
}