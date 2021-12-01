import { Grid, Breadcrumbs, Link, Typography } from "@mui/material"
import LoginForm from "./LoginForm";


const Login = () => {

    return (
        <Grid container>
            <Grid item xs={0} md={6} lg={6} style={{ height: "100vh", backgroundImage: `url("/media/photos/game-branding/bgRiskThetaLoginForm.png")`, backgroundSize: "cover" }}>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ backgroundColor: "#141124", height: "100vh" }}>
                <Breadcrumbs style={{ marginLeft: "2em", marginTop: "1em", color: "ghostwhite" }}>
                    <Typography color="ghostwhite"><b>LOGIN</b></Typography>
                    <Link underline="hover" color="inherit" href="/auth/signup">
                        JOIN
                    </Link>
                </Breadcrumbs>
                <div style={{ marginTop: "25%", marginLeft: "25%" }}>
                    <h1 style={{ color: "ghostwhite" }}>Welcome back.</h1>
                    <LoginForm />
                </div>

            </Grid>

        </Grid>

    )
}

export default Login;