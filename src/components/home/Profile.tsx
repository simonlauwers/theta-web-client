/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Card, Avatar, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../hooks/context-hooks/UseAuth";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "react-query";
import * as userApi from "../../api/user/UserApi";
import ProfileType from "../../types/ProfileType";
import UserType from "../../types/UserType";
import formatRelative from "date-fns/formatRelative";


export const Profile = () => {
	const { user } = useAuth();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const [displayName, setDisplayName] = useState(user?.displayName);

	const { mutate: changeProfile } = useMutation(userApi.editProfile, {
		onSuccess: (data: UserType) => {
			handleClose();
			setDisplayName(data.displayName);
			window.location.reload();
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
			setError("This displayname is already in use");
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
		<div style={{ zIndex: 1000 }}>
			<h1 style={{ color: "white" }} >Your profile</h1>
			<Card sx={{ background: "linear-gradient(180deg, rgba(0,39,67,0.5) 0%, rgba(14,14,56,0.5) 100%)", padding: 5 }}>
				<Grid container spacing={3}>
					<Grid item>
						<Avatar src={user?.profilePicture} onDragStart={(e) => { e.preventDefault(); }} sx={{ width: 150, height: 150 }} />
					</Grid>
					<Grid item>
						<div >
							<Typography sx={{ fontSize: 10, color: "white" }} onDragStart={(e) => { e.preventDefault(); }}>DISPLAYNAME</Typography>
							<Typography sx={{ fontSize: 20, color: "white" }}>{user?.displayName} <EditIcon sx={{ fontSize: 17, "&:hover": { cursor: "pointer" } }} onClick={() => handleOpen()} /></Typography>
						</div>
						<div style={{ marginTop: 10 }}>
							<Typography sx={{ fontSize: 10, color: "white" }} onDragStart={(e) => { e.preventDefault(); }}>EMAIL</Typography>
							<Typography sx={{ fontSize: 20, color: "white" }}>{user?.email}</Typography>
						</div>
						<div style={{ marginTop: 10 }}>
							<Typography sx={{ fontSize: 10, color: "white" }} onDragStart={(e) => { e.preventDefault(); }}>LAST LOGIN</Typography>
							<Typography sx={{ fontSize: 20, color: "white" }}>{user ? formatRelative(new Date(user.lastLogin), new Date()) : "Unknown"}</Typography>
						</div>

					</Grid>  
				</Grid>
			</Card>


			<Dialog
				style={{ zIndex: 6666 }}
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
					<Button onClick={handleClose}>Cancel</Button>
					<Button disabled={error != ""} onClick={() => checkDisplayNameAvailability(displayName!)}>Save</Button>
				</DialogActions>
			</Dialog>
		</div >
	);
};
