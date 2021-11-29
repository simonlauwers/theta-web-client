import { Grid, Breadcrumbs, Link, Typography } from "@mui/material"


const Signup = () => {
    return (
        <Grid container>
            <Grid item xs={0} md={6} lg={6} style={{ height: "100vh", backgroundImage: `url("/media/photos/bgRiskThetaLoginForm.png")`, backgroundSize: "cover" }}>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ backgroundColor: "#141124", height: "100vh" }}>
                <Breadcrumbs style={{ marginLeft: "2em", marginTop: "1em", color: "ghostwhite" }}>
                    <Link underline="hover" color="inherit" href="/">
                        LOGIN
                    </Link>
                    <Typography color="ghostwhite"><b>JOIN</b></Typography>
                </Breadcrumbs>
                <div style={{ marginTop: "25%", marginLeft: "25%" }}>
                    <h1 style={{ color: "ghostwhite" }}>Ready to conquer the world?</h1>

                </div>

            </Grid>

        </Grid>
    )
}

export default Signup;