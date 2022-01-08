import { Theme } from "@emotion/react";
import { TextField, Button } from "@mui/material";

import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
    createStyles({
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: "auto"
        },
        wrapText: {
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
        },
    })
);


export const TextInput = () => {
    const classes = useStyles();
    return (
        <>

        </>
    );
};



