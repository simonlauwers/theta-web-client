import { Grid, Breadcrumbs, Link as LinkMui, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";


const Login = () => {
    return (
        <Grid item xs={12} md={6} lg={6} style={{ backgroundColor: "#141124", height: "100vh" }}>
            <Breadcrumbs style={{ marginLeft: "2em", marginTop: "1em", color: "ghostwhite" }}>
                <Typography color="ghostwhite"><b>LOGIN</b></Typography>
                <Link to="/auth/signup">Join</Link>

            </Breadcrumbs>
            <div style={{ marginTop: "25%", marginLeft: "25%" }}>
                <h1 style={{ color: "ghostwhite" }}>Welcome back.</h1>
                <LoginForm />
            </div>
        </Grid>
    )
}

export default Login;