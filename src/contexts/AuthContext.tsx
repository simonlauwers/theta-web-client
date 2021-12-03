import { createContext, useContext } from 'react';
import UserType from '../types/UserType';

export const emptyUser: UserType = { email: "", displayName: "" }

interface AuthContextType {
    user?: UserType;
    loading: boolean;
    error?: any;
    login: (email: string, password: string) => void;
    signUp: (email: string, displayName: string, password: string) => void;
    logout: () => void;
  }

  export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
  );


  export function useAuth() {
    return useContext(AuthContext);
  }