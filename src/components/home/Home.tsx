import { Avatar, Button, Card, Fade, Grid } from "@mui/material";
import FriendsOnlyCard from "./FriendsOnlyCard";
import HomeProfileCard from "./HomeProfileCard";
import MultiplayerCard from "./MultiplayerCard";
import SingleplayerCard from "./SingleplayerCard";

const Home = () => {
    return (
        <>
            <div style={{ zIndex: 9999, marginLeft: 50, marginTop: "-4%" }}>
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
                        <Grid item xs={12} md={6} style={{ color: "white", paddingTop: "13%" }}>
                            <HomeProfileCard />
                        </Grid>
                    </Grid>
                </Fade>

                <Fade in={true} style={{ transitionDelay: '1700ms' }}>
                    <Grid style={{ marginBottom: "5%", marginTop: "2.5%" }} container spacing={2} >

                        <Grid item xs={12} md={12} style={{ color: "white" }}>
                            <p style={{ fontSize: "2em" }}>Ready to conquer the world?</p>
                        </Grid>

                        <Grid item xs={6} md={12} style={{ marginTop: "-1%", color: "white" }}>
                            <Grid container spacing={4} style={{ display: "flex", flexWrap: "nowrap", maxWidth: "100%" }}  >
                                <Grid item xs={12} style={{ color: "white" }}>
                                    <SingleplayerCard
                                        backgroundImage={`url("/media/photos/game-visuals/Badlands.png")`}
                                        key="Singleplayer" />
                                </Grid>
                                <Grid item xs={12} style={{ color: "white" }}>
                                    <MultiplayerCard
                                        backgroundImage={`url("/media/photos/game-visuals/FireTemple.png")`}
                                        key="Multiplayer" />
                                </Grid>
                                <Grid item xs={12} style={{ color: "white" }}>
                                    <FriendsOnlyCard
                                        backgroundImage={`url("/media/photos/game-visuals/IcePalace.png")`}
                                        key="FriendsOnly" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Fade>
            </div >
        </>
    )
}

export default Home;