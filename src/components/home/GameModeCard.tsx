import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MultiplayerCardProps {
    text: string,
    backgroundImage: string
    url: string
}

export const GameModeCard = ({ text, backgroundImage, url }: MultiplayerCardProps) => {
    const audio = new Audio("./media/sounds/ui-sounds/button_click_1.mp3");
    const navigate = useNavigate();

    const handlePlayButtonClick = () => {
        audio.play();
        navigate(url);
    };

    const handleLearnMoreClick = () => {
        audio.play();
        console.log("TODO learn more page");
    };

    return (
        <Card sx={{
            minWidth: 200, "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
                transition: "all 0.5s",
            }, backgroundImage: backgroundImage, backgroundSize: "cover", color: "white", fontWeight: 500
        }}>
            <CardContent>
                <Typography fontWeight="800" gutterBottom variant="h5" component="div">
                    {text}
                </Typography>
            </CardContent>
            <CardActions>
                <Button sx={{ color: "white" }} onClick={handlePlayButtonClick} size="small">PLAY</Button>
                <Button sx={{ color: "white" }} onClick={handleLearnMoreClick} size="small">LEARN MORE</Button>
            </CardActions>
        </Card>
    );

};

