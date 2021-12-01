import { Avatar, Button, Fade, Grid } from "@mui/material";
import HomeGameplayCard from "./HomeGameplayCard";

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
                            <Grid item xs={12} style={{ color: "white" }}>
                                <HomeGameplayCard
                                    backgroundImage={`url("/media/game-visuals/Badlands.png")`}
                                    title="Singleplayer"
                                    firstButtonText="PLAY"
                                    secondButtonText="MORE INFO"
                                    key="Singleplayer" />
                            </Grid>
                            <Grid item xs={12} style={{ color: "white" }}>
                                <HomeGameplayCard
                                    backgroundImage={`url("/media/game-visuals/FireTemple.png")`}
                                    title="Global domination"
                                    firstButtonText="PLAY"
                                    secondButtonText="MORE INFO"
                                    key="Global domination" />
                            </Grid>
                            <Grid item xs={12} style={{ color: "white" }}>
                                <HomeGameplayCard
                                    backgroundImage={`url("/media/game-visuals/IcePalace.png")`}
                                    title="Friends Only"
                                    firstButtonText="PLAY"
                                    secondButtonText="MORE INFO"
                                    key="Friends Only" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </div >
    )
}

export default Home;