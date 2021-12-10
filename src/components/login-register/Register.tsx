import { Grid, Breadcrumbs, Link as LinkMui, Typography } from "@mui/material";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";

const Register = () => {
  return <Grid item xs={12} md={6} lg={6} style={{
    backgroundColor: "#141124",
    height: "100vh"
  }}>
    <Breadcrumbs style={{
      marginLeft: "2em",
      marginTop: "1em",
      color: "ghostwhite"
    }}>
      <Link to="/auth/login">LOGIN</Link>
      <Typography color="ghostwhite"><b>JOIN</b></Typography>
    </Breadcrumbs>
    <div style={{
      marginTop: "10%",
      marginLeft: "25%"
    }}>
      <h1 style={{
        color: "ghostwhite"
      }}>Join the squad.</h1>
      <RegisterForm />
    </div>

  </Grid>;
};

export default Register;