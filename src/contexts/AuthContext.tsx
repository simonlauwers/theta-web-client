import React, { createContext, useState } from 'react';
import UserType from '../types/UserType';

const emptyUser: UserType = { email: "", displayName: "" }

const UserContext = createContext({
    user: emptyUser,
    updateUser: () => { },
});


export default UserContext;
