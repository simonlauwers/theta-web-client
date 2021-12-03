import { useState } from "react";
import UserType from "../types/UserType";
import UserContext from "./AuthContext";

const UserProvider = (props: any) => {
    const [user, setUser] = useState<UserType>()

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

export default UserProvider;