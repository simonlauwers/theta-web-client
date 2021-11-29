import { Alert, Button, IconButton, InputAdornment, Snackbar, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import WhiteTextField from '../formInputs/WhiteTextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik, ErrorMessage } from 'formik';
import PasswordStrengthBar from "react-password-strength-bar";
import * as yup from 'yup';

const validationSchemaSignup = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
            "Must contain 8 characters, one uppercase and one lowercase")
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    displayName: yup
        .string()
        .min(6, 'Displayname should have a minimum of 6 characters')
        .required('Displayname is required')
});

interface SignupValues {
    email: string,
    password: string,
    passwordConfirmation: string,
    displayName: string
}


const SignupForm = () => {
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<Boolean>(false);
    const [showFormErrorSnackbar, setShowFormErrorSnackbar] = useState(false);

    const handleClickShowPassword = (confirmationPassword: Boolean) => {
        if (confirmationPassword) {
            setShowPasswordConfirmation(!showPasswordConfirmation);
        } else {
            setShowPassword(!showPassword);
        }
    }

    const handleCloseSnackbar = () => {
        return setShowFormErrorSnackbar(false);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
            displayName: ''
        },
        validationSchema: validationSchemaSignup,
        onSubmit: (values: SignupValues) => {
            alert(JSON.stringify(values, null, 2));
        },
    });



    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack style={{ maxWidth: "50%" }}>

                < Snackbar
                    open={showFormErrorSnackbar}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}>

                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        Please check your input.
                    </Alert>

                </Snackbar>

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
                    style={{ marginTop: "5%" }}
                    label="Displayname"
                    id="displayName"
                    variant="filled"
                    name="displayName"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                />
                {formik.errors.displayName && formik.touched.displayName ? (<div style={{ color: "white" }}>{"Uh oh... " + formik.errors.displayName}</div>) : null}

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
                                onClick={() => { handleClickShowPassword(false) }}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                <PasswordStrengthBar password={formik.values.password} minLength={8} />
                {formik.errors.password && formik.touched.password ? (<div style={{ color: "white" }}>{"Uh oh... " + formik.errors.password}</div>) : null}

                <WhiteTextField
                    label="Confirm your password"
                    style={{ marginTop: 25 }}
                    id="email"
                    name="passwordConfirmation"
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    variant="filled"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}

                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => { handleClickShowPassword(true) }}
                                edge="end"
                            >
                                {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation ? (<div style={{ color: "white" }}>{"Uh oh... " + formik.errors.passwordConfirmation}</div>) : null}


                <Button style={{ marginTop: 25, backgroundColor: "ghostwhite", color: "#141124", fontWeight: "bold" }} type="submit" variant="contained">Signup</Button>
            </Stack>
        </form >
    );




}

export default SignupForm;