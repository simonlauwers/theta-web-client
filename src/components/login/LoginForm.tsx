import { Button, IconButton, InputAdornment, Snackbar, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import WhiteTextField from '../theme/formInputs/WhiteTextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from "../../hooks/UseAuth";

const validationSchemaLogin = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
});

interface LoginValues {
    email: string,
    password: string
}


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const { login, loading, error, user } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchemaLogin,
        onSubmit: async (values: LoginValues) => {
            login(values.email, values.password);
        },
    });



    if (loading) {
        return (<div />)
    }
    else {
        console.log("error",error);
        
        return (
            <>
            {error && "User not found"}
            <form onSubmit={formik.handleSubmit}>
                <Stack style={{ maxWidth: "50%" }}>
                    <WhiteTextField
                        label="Email"
                        id="email"
                        variant="filled"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    {formik.errors.email && formik.touched.email ? (<div style={{ color: "white" }}>{"Uh oh... " + formik.errors.email}</div>) : null}

                    <WhiteTextField
                        label="Password"
                        style={{ marginTop: 25 }}
                        id="email"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        variant="filled"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}

                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                    {formik.errors.password && formik.touched.password ? (<div style={{ color: "white" }}>{"Uh oh... " + formik.errors.password}</div>) : null}

                    <Button style={{ marginTop: 25, backgroundColor: "ghostwhite", color: "#141124", fontWeight: "bold" }} type="submit" variant="contained">Login</Button>
                </Stack>
            </form >
            </>
        );
    }






}

export default LoginForm;