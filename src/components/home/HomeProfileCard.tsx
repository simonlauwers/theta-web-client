import { Avatar, Card } from "@mui/material";

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

const HomeProfileCard = () => {
    return (
        <Card style={styling}>
            <Avatar sx={{ bgcolor: "grey", width: 200, height: 200, boxShadow: 5 }}>STRIJDER-</Avatar>
            <p style={{ color: "white", fontSize: "1.5em" }}>Welcome back, <strong>STRIJDER-</strong></p>
        </Card>
    )
}

export default HomeProfileCard;