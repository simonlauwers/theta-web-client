import axios from "axios";
import EmailType from "../../types/EmailType";
import GoogleProfileType from "../../types/GoogleProfileType";
import LoginType from "../../types/LoginType";
import ProfileType from "../../types/ProfileType";
import RegisterType from "../../types/RegisterType";
import ResetPasswordType from "../../types/ResetPasswordType";
import TokenType from "../../types/TokenType";

const api = axios.create({
	baseURL: location.hostname === "localhost" ? "http://localhost:8081/" : "/api/user/",
	withCredentials: true
});

export async function login(loginValues: LoginType) {
	const response = await api.post("/login", loginValues);
	return response.data;
}

export async function loginWithGoogle(profile: GoogleProfileType) {
	console.log(profile);
	const response = await api.post("/google-login", profile);
	return response.data;
}

export async function register(registerValues: RegisterType) {
	const response = await api.post("/register", registerValues);
	return response.data;
}

export async function confirmAccount(token: TokenType) {
	const response = await api.post("/confirm-account", token);
	return response.data;
}

export async function sendForgotPasswordEmail(email: EmailType) {
	const response = await api.post("/send-forgot-password-email", email);
	return response.data;
}

export async function resetPassword(resetPasswordValues: ResetPasswordType) {
	console.log("resetting password");
	console.log(resetPasswordValues);
	const response = await api.post("/reset-password", resetPasswordValues);
	return response.data;
}

export async function logOut() {
	const response = await api.post("/logout");
	return response.data;
}

export async function whoAmI() {
	const response = await api.get("/whoami");
	return response.data;
}

export async function displaynameAvailable(name: ProfileType) {
	const response = await api.post("/displayname-available", name);
	return response.data;
}

export async function editProfile(newProfile: ProfileType) {
	const response = await api.post("/edit-profile", newProfile);
	return response.data;
}