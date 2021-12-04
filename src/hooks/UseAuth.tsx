import {useContext} from "react";
import AuthContextType from "../types/AuthContextType";
import AuthContext from "../contexts/AuthContext";

export default function useAuth(): AuthContextType {
    return useContext(AuthContext);
}