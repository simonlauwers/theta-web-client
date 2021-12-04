import {createContext} from 'react';
import AuthContextType from "../types/AuthContextType";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
