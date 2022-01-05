import { Avatar, Card } from "@mui/material";
import React from "react";
import UserType from "../../types/UserType";

const styling: React.CSSProperties = {
	display: "flex",
	backgroundColor: "rgba(0, 0, 0, 0.35)",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "row",
	flexWrap: "wrap",
	maxWidth: 400,
	padding: 20,
	boxShadow: "0px 2px 10px black"
};

const ProfileCard = ({ displayName, profilePicture }: UserType) => {
	return (
		<Card style={styling}>
			<Avatar sx={{ bgcolor: "grey", width: 200, height: 200, boxShadow: 5 }}><img src={profilePicture} onDragStart={(e) => { e.preventDefault(); }} /></Avatar>
			<p style={{ color: "white", fontSize: "1.5em" }}>Displayname: <strong>{displayName}</strong></p>
		</Card>
	);
};

export default ProfileCard;