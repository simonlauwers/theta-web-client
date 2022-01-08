import { Card, CardActionArea, CardContent, Grid, Typography, Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ScenarioOrCode = () => {
    const navigate = useNavigate();
    const gameMode = useParams();
    return (
        <Grid container spacing={0} style={{ display: "flex", flexDirection: "row", maxWidth: "100%", height: "30%", color: "white" }}  >
            {/* Scenario */}
            <Card sx={{
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
                    transition: "all 0.5s",
                }, background: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(56,14,40,1) 100%)",
                color: "white", fontWeight: 500, height: "350px", width: "275px"
            }}>
                <CardActionArea sx={{ height: "100%", textAlign: "center" }} onClick={() => navigate(`/${gameMode}/scenarios`)}>
                    <CardContent>
                        <Typography fontFamily="bebas-neue" gutterBottom variant="h5" component="div" sx={{ fontSize: "4rem", position: "absolute", bottom: 0, }}>
                            Scenario
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card >
            {/* Code */}

            <Card sx={{
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
                    transition: "all 0.5s",
                }, background: "linear-gradient(196deg, rgba(66,2,2,1) 0%, rgba(37,14,56,1) 100%)",
                color: "white", fontWeight: 500, height: "350px", width: "275px"
            }}>
                <CardContent>
                    <Typography fontFamily="bebas-neue" gutterBottom variant="h5" component="div" sx={{ fontSize: "4rem", position: "absolute", bottom: 0, }}>
                        GAMECODE
                    </Typography>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <Button></Button>
                </CardContent>

            </Card >
        </Grid>
    );
};
