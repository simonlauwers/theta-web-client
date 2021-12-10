import React, { createContext } from 'react';
import UserType from '../types/UserType';
import { useMemo, useState, FC } from "react";


export interface AuthContextType {
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { }
});

export const AuthProvider: FC = ({
    children
}) => {
    const [user, setUser] = useState<UserType | null>(null);

    const memoedValue = useMemo(
        () => ({
            user,
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );

}



