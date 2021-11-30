import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Container, Fade, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Home = () => {
    return (
        <div style={{ zIndex: 9999, marginLeft: 50 }}>
            <Fade in={true} style={{ transitionDelay: '800ms' }}>
                <Grid container spacing={6} >

                    <Grid item xs={12} md={6} style={{ color: "white" }}>
                        <h1 style={{ fontSize: "9em", fontFamily: "fantasy" }}>RISK</h1>
                        <p style={{ marginTop: "-3em", fontSize: "2em" }}>You've played 10 hours in total.</p>
                        <Button style={{ marginTop: "-2em" }} variant="contained" sx={{
                            backgroundColor: "#989898", '&:hover': {
                                backgroundColor: "#131B2A",
                            }
                        }}>See all stats</Button>
                    </Grid>

                    <Grid item xs={12} md={6} style={{ color: "white", paddingTop: "13%", justifyContent: "center" }}>
                        <Avatar sx={{ bgcolor: "grey", marginLeft: "6%", width: 200, height: 200, boxShadow: 5 }}>STRIJDER-</Avatar><br />
                        <p style={{ fontSize: "1.5em" }}>Welcome back, <strong>STRIJDER-</strong></p>
                    </Grid>

                </Grid>
            </Fade>

            <Fade in={true} style={{ transitionDelay: '2000ms' }}>
                <Grid style={{ marginBottom: "5%", marginTop: "2.5%" }} container spacing={2} >

                    <Grid item xs={12} md={12} style={{ color: "white" }}>
                        <p style={{ fontSize: "2em" }}>Ready to conquer the world?</p>
                    </Grid>

                    <Grid item xs={6} md={12} style={{ color: "white" }}>
                        <Grid container spacing={4} style={{ display: "flex", flexWrap: "nowrap", maxWidth: "100%" }}  >

                        {/*TODO: Cards in seperate component*/ }
                        
                            <Grid item xs={6} style={{ color: "white" }}>
                                <Card sx={{ minWidth: 200, backgroundImage:`url("/media/game-visuals/Badlands.png")`, backgroundSize:"cover", color:"white", fontWeight:500 }}>
                                    <CardContent>
                                        <Typography fontWeight="800" gutterBottom variant="h5" component="div">
                                            Singleplayer
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button sx={{color:"white"}} size="small">PLAY</Button>
                                        <Button sx={{color:"white"}} size="small">MORE INFO</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={6} style={{ color: "white" }}>
                            <Card sx={{ minWidth: 200, backgroundImage:`url("/media/game-visuals/FireTemple.png")`, backgroundSize:"cover", color:"white", fontWeight:500, textShadow:"10" }}>
                                    <CardContent>
                                        <Typography fontWeight="800" gutterBottom variant="h5" component="div">
                                            Global Domination
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button sx={{color:"white"}} size="small">PLAY</Button>
                                        <Button sx={{color:"white"}} size="small">MORE INFO</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={6} style={{ color: "white" }}>
                            <Card sx={{ minWidth: 200, backgroundImage:`url("/media/game-visuals/IcePalace.png")`, backgroundSize:"cover", color:"white", fontWeight:500 }}>
                                    <CardContent>
                                        <Typography fontWeight="800" gutterBottom variant="h5" component="div">
                                            Friends Only
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button sx={{color:"white"}} size="small">PLAY</Button>
                                        <Button sx={{color:"white"}} size="small">MORE INFO</Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>
            </Fade>



        </div >
    )
}

export default Home;