import { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

export default function useAuth(): AuthContextType {
	return useContext(AuthContext);
}