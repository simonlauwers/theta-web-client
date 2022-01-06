import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MultiplayerCardProps {
    text: string,
    gradientColors: string
    url: string,
    image: string
}

export const GameModeCard = ({ text, gradientColors, url, image }: MultiplayerCardProps) => {
    const audio = new Audio("./media/sounds/ui-sounds/button_click_1.mp3");
    const navigate = useNavigate();

    const handlePlayButtonClick = () => {
        audio.play();
        navigate(url);
    };

    return (
        <Card sx={{
            "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
                transition: "all 0.5s",
            }, background: gradientColors, color: "white", fontWeight: 500, height: "350px", width: "275px"
        }}>
            <CardActionArea sx={{ height: "100%", textAlign: "center" }} onClick={() => handlePlayButtonClick()}>
                <CardContent>
                    <img src={image} style={{ width: "100%", height: "100%", objectFit: "cover" }}></img>
                    <Typography fontFamily="bebas-neue" gutterBottom variant="h5" component="div" sx={{ fontSize: "4rem", position: "absolute", bottom: 0, }}>
                        {text}
                    </Typography>

                </CardContent>
            </CardActionArea>


        </Card >
    );

};

