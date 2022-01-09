/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useError from "../../hooks/context-hooks/game/UseError";
import { convertErrorMessageToFriendlyMessage } from "../../utils/Utils";
import { backgroundColor } from "../../theme/colors";
import useErrorHandler from "../../hooks/context-hooks/UseErrorHandler";

const ErrorHandler = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { error, setError } = useError();
    const { setError : setGlobalError } = useErrorHandler();
    const navigate = useNavigate();

    useEffect(() => {
		if(error !== null) {            
            if (error.status === 409) {
                setGlobalError({status: 409, message: "Oops it looks like the host left." , timestamp: ""});
                navigate("/home");
            }
			setTimeout(() => {setError(null);}, 3500);
            setIsOpen(true);
		}
	}, [error]);

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={() => {setIsOpen(false);}}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
             }}
             style={{background: backgroundColor.main}}
             ><Alert severity="error" style={{color:"white", background: backgroundColor.main}} >{error === null? "" : convertErrorMessageToFriendlyMessage(error!.message)}</Alert>
        </Snackbar>
    );
};

export default ErrorHandler;