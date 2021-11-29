import React, { createContext, useState } from 'react';
import UserType from '../types/UserType';

const emptyUser: UserType = { email: "", displayName: "" }

const UserContext = createContext({
    user: emptyUser,
    updateUser: () => { },
});

const UserProvider = (props: any) => {
    const [user, setUser] = useState<UserType>(emptyUser)

    const updateUser = () => {
        setUser(user);
    };

    const { children } = props;

    return (
        <UserContext.Provider value={{ user: user, updateUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );

}

export const UserConsumer = UserContext.Consumer;
