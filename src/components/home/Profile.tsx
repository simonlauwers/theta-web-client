/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../hooks/context-hooks/UseAuth";
import ProfileCard from "./ProfileCard";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "react-query";
import * as userApi from "../../api/user/UserApi";
import ProfileType from "../../types/ProfileType";
import UserType from "../../types/UserType";

export const Profile = () => {
    console.log("profile rerender");
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [displayName, setDisplayName] = useState(user?.displayName);

    const { mutate: changeProfile } = useMutation(userApi.editProfile, {
        onSuccess: (data: UserType) => {
            console.log(data);
            handleClose();
            setDisplayName(data.displayName);
        }, onError: () => {
            setError("Someting went wrong. Try again later..");
        }
    });

    const { mutate: checkAvailability } = useMutation(userApi.displaynameAvailable, {
        onSuccess: (data: boolean) => {
            if (data == true) {
                changeProfile({ displayName: displayName, email: user?.email } as ProfileType);
            }
        },
        onError: () => {
            setError("this displayname is already in use");
        }
    });


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const checkDisplayNameAvailability = async (displayName: string) => {
        checkAvailability({ displayName: displayName } as ProfileType);
    };

    const displayNameChanged = (e: any) => {
        setError("");
        setDisplayName(e.target.value);
    };


    return (
        <div>
            <h1 style={{ color: "white" }} >Profile and add friends go here</h1>
            <ProfileCard {...user!} />
            <Button endIcon={<EditIcon />} variant="contained" onClick={() => handleOpen()}>Edit profile</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Change displayname
                </DialogTitle>
                <DialogContent>
                    <TextField margin="normal" error={error !== ""} label="displayName" type="text" fullWidth name="displayName" value={displayName} onChange={(e) => displayNameChanged(e)} helperText={error} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button disabled={error != ""} onClick={() => checkDisplayNameAvailability(displayName!)}>Changes</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};
