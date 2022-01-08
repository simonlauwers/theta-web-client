import { Grid, Card, CardActionArea, CardContent, Typography, Fade } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import WhiteTextField from "../theme/formInputs/WhiteTextField";

export interface PickerValues {
    gameCode: string
}

export const Picker = () => {

    const navigate = useNavigate();
    const { gameMode } = useParams<string>();
    const formik = useFormik({
        initialValues: {
            gameCode: "",
        },
        onSubmit: async (gameCode: PickerValues) => {
            // do call
            console.log(gameCode);
        },
    });
    return (
        <Fade in={true} style={{ transitionDelay: "50ms" }}>

            <Grid container spacing={0} style={{ display: "flex", flexDirection: "row", gap: "40px", maxWidth: "100%", color: "white", alignItems: "center", justifyContent: "center", height: "100vh", marginLeft: "-240px" }}  >
                <Card sx={{
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
                        transition: "all 0.5s",
                    }, background: "linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)", color: "white", fontWeight: 500, height: "350px", width: "275px"
                }}>
                    <CardActionArea sx={{ height: "100%", textAlign: "center" }} onClick={() => navigate(`/${gameMode}/scenarios`)}>
                        <CardContent>
                            <Typography fontFamily="bebas-neue" gutterBottom variant="h5" component="div" sx={{ fontSize: "4rem", position: "absolute", bottom: 0, }}>
                                HOST 👑
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card >
                <Typography gutterBottom variant="h5" component="div" sx={{
                    fontSize: "4rem", MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none"
                }}>
                    x
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Typography fontFamily="bebas-neue" gutterBottom variant="h5" component="div" sx={{ fontSize: "4rem" }}>
                        ENTER GAMECODE
                    </Typography>
                    <div style={{ display: "inline" }}>
                        <WhiteTextField
                            label="gameCode"
                            id="gameCode"
                            variant="filled"
                            name="gameCode"
                            autoComplete="none"
                            value={formik.values.gameCode}
                            onChange={formik.handleChange}
                        />
                    </div>
                </form>
            </Grid >
        </Fade>
    );
};
