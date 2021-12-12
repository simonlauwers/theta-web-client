import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { whoAmI } from "../../api/user/UserApi";
import useAuth from "../UseAuth";

export const useWhoAmI = () => {
    const { data, status, isError, isLoading } = useQuery("user", whoAmI);
    const { setUser } = useAuth();
    useEffect(() => {
        if (!isLoading && !isError) {
            setUser(data);
        }
    }, [data]);
    return isLoading;
};
