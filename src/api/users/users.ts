import axios from "axios";

interface SignUpValues {
    displayName: string;
    email: string;
    password: string;
}


const fetch = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API_BASE_URL
});

export async function signup(params: SignUpValues): Promise<SignUpValues> {
    const response = await fetch.post("/signup", { params });

    return response.data.data;
}




