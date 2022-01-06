import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useError from "../../hooks/context-hooks/game/UseError";

const ErrorHandler = () => {
    const { error, setError } = useError();
    const navigate = useNavigate();

    useEffect(() => {
		if(error !== null) {            
            
            if (error.status === 409) {
                navigate("/home");
            }

			setTimeout(() => {setError(null);}, 2000);

		}
	}, [error]);

    return (
        <></>
    );
};

export default ErrorHandler;
