/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IconButton, Snackbar, Alert } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useError from "../../hooks/context-hooks/game/UseError";
import CloseIcon from "@mui/icons-material/Close";
import { convertErrorMessageToFriendlyMessage } from "../../utils/Utils";

const ErrorHandler = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { error, setError } = useError();
    const navigate = useNavigate();

    useEffect(() => {
		if(error !== null) {            
            if (error.status === 409) {
                navigate("/home");
            }
			setTimeout(() => {setError(null);}, 3000);
            setIsOpen(true);
		}
	}, [error]);

    function action() {
        return (
            <Fragment>
              <IconButton onClick={() => {setIsOpen(false);}}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Fragment>
          );
    } 

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={() => {setIsOpen(false);}}
            action={action}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
             }}
             ><Alert severity="error">{error === null? "" : convertErrorMessageToFriendlyMessage(error!.message)}</Alert>
        </Snackbar>
    );
};

export default ErrorHandler;