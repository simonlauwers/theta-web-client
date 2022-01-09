/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { convertErrorMessageToFriendlyMessage } from "../../utils/Utils";
import useErrorHandler from "../../hooks/context-hooks/UseErrorHandler";

const ErrorSnackBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { error, setError } = useErrorHandler();

    useEffect(() => {
		if(error !== null) {            
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
                vertical: "bottom",
                horizontal: "left"
             }}
             style={{background: "linear-gradient(180deg, rgba(79,18,16,1) 0%, rgba(41,5,25,1) 100%)", borderRadius:"1rem"}}
             ><Alert severity="error" style={{color:"white", background: "linear-gradient(180deg, rgba(79,18,16,1) 0%, rgba(41,5,25,1) 100%)",
              borderRadius:"1rem"}} >{error === null? "" : convertErrorMessageToFriendlyMessage(error!.message)}</Alert>
        </Snackbar>
    );
};

export default ErrorSnackBar;