import UserType from "./UserType";

export default interface AuthContextType {
    user?: UserType;
    loading: boolean;
    error?: any;
    login: (email: string, password: string) => void;
    signUp: (email: string, displayName: string, password: string) => void;
    logout: () => void;
}