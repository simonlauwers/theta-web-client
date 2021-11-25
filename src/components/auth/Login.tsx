import { Grid, Stack, Breadcrumbs, Link, Typography } from "@mui/material"
import LoginForm from "./LoginForm";



const Login = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} style={{ height: "100vh", backgroundImage: `url("https://i.pinimg.com/originals/f3/6e/22/f36e22582b470d538a246a87e402e6b1.jpg")`, backgroundSize: "cover" }}>
            </Grid>
            <Grid item xs={6} style={{ backgroundColor: "#141124", height: "100vh" }}>
                <Breadcrumbs style={{ marginTop: 15, color: "ghostwhite" }}>
                    <Typography color="ghostwhite"><b>LOGIN</b></Typography>
                    <Link underline="hover" color="inherit" href="/">
                        JOIN
                    </Link>
                </Breadcrumbs>
                <div style={{ marginTop: "25%", marginLeft: "25%" }}>
                    <h1 style={{ color: "ghostwhite" }}>Welcome back.</h1>
                    <Stack>
                        <LoginForm />
                    </Stack>
                </div>

            </Grid>

        </Grid>

    )
}

export default Login;