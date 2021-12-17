import { Alert, Button, IconButton, InputAdornment, LinearProgress, Snackbar, Stack } from "@mui/material";
import React, { useState } from "react";
import WhiteTextField from "../theme/formInputs/WhiteTextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import PasswordStrengthBar from "react-password-strength-bar";
import * as yup from "yup";
import useAuth from "../../hooks/UseAuth";
import * as userApi from "../../api/user/UserApi";
import { useMutation, useQueryClient } from "react-query";
import ResponseMessageType from "../../types/ResponseMessageType";
import UserType from "../../types/UserType";
import { convertErrorMessageToFriendlyMessage } from "../../utils/Utils";


const validationSchemaSignup = yup.object({
	email: yup.string().email("Enter a valid email").required("Email is required"),
	password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/, "Must contain 8 characters, one uppercase and one lowercase").required("Password is required"),
	passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
	displayName: yup.string().min(6, "Displayname should have a minimum of 6 characters").required("Displayname is required")
});
interface SignupValues {
	email: string;
	password: string;
	passwordConfirmation: string;
	displayName: string;
}

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
	const [showFormErrorSnackbar, setShowFormErrorSnackbar] = useState(false);
	const [error, setError] = useState<ResponseMessageType | null>(null);
	const [successAlert, setSuccessAlert] = useState<string | null>(null);
	const { setUser } = useAuth();
	const queryClient = useQueryClient();

	const { mutate, isLoading } = useMutation(userApi.register, {
		onSuccess: (data: UserType) => {
			setUser(data);
			setError(null);
			setSuccessAlert("Email verification sent! Check your mail box!");
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			rmt.message = convertErrorMessageToFriendlyMessage(rmt.message);
			setError(rmt);
		},
		onSettled: () => {
			queryClient.invalidateQueries("create");
		}
	});

	const handleClickShowPassword = (confirmationPassword: boolean) => {
		if (confirmationPassword) {
			setShowPasswordConfirmation(!showPasswordConfirmation);
		} else {
			setShowPassword(!showPassword);
		}
	};

	const handleCloseSnackbar = () => {
		return setShowFormErrorSnackbar(false);
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			passwordConfirmation: "",
			displayName: ""
		},
		validationSchema: validationSchemaSignup,
		onSubmit: (values: SignupValues) => {
			setSuccessAlert(null);
			const newUser = { ...values };
			mutate(newUser);
			console.log(newUser);
		}
	});
	return <form onSubmit={formik.handleSubmit}>
		<Stack style={{
			maxWidth: "50%"
		}}>

			<Snackbar open={showFormErrorSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>

				<Alert onClose={handleCloseSnackbar} severity="error" sx={{
					width: "100%"
				}}>
					Please check your input.
				</Alert>

			</Snackbar>

			<WhiteTextField label="Email" id="email" variant="filled" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} />
			{formik.errors.email && formik.touched.email ? <div style={{
				color: "white"
			}}>{"Uh oh... " + formik.errors.email}</div> : null}

			<WhiteTextField style={{
				marginTop: "5%"
			}} label="Displayname" id="displayName" variant="filled" name="displayName" autoComplete="off" value={formik.values.displayName} onChange={formik.handleChange} error={formik.touched.displayName && Boolean(formik.errors.displayName)} />
			{formik.errors.displayName && formik.touched.displayName ? <div style={{
				color: "white"
			}}>{"Uh oh... " + formik.errors.displayName}</div> : null}

			<WhiteTextField label="Password" style={{
				marginTop: 25
			}} id="password" name="password" type={showPassword ? "text" : "password"} variant="filled" autoComplete="off" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} InputProps={{
				endAdornment: <InputAdornment position="end">
					<IconButton aria-label="toggle password visibility" onClick={() => {
						handleClickShowPassword(false);
					}} edge="end">
						{showPassword ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</InputAdornment>
			}} />

			<PasswordStrengthBar password={formik.values.password} minLength={8} />

			{formik.errors.password && formik.touched.password ? <div style={{
				color: "white"
			}}>{"Uh oh... " + formik.errors.password}</div> : null}

			<WhiteTextField label="Confirm your password" style={{
				marginTop: 25
			}} id="passwordConfirmation" name="passwordConfirmation" autoComplete="off" type={showPasswordConfirmation ? "text" : "password"} variant="filled" value={formik.values.passwordConfirmation} onChange={formik.handleChange} error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)} InputProps={{
				endAdornment: <InputAdornment position="end">
					<IconButton aria-label="toggle password visibility" onClick={() => {
						handleClickShowPassword(true);
					}} edge="end">
						{showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</InputAdornment>
			}} />
			{formik.errors.passwordConfirmation && formik.touched.passwordConfirmation ? <div style={{
				color: "white"
			}}>{"Uh oh... " + formik.errors.passwordConfirmation}</div> : null}

			<Button style={{
				marginTop: 25,
				backgroundColor: "ghostwhite",
				color: "#141124",
				fontWeight: "bold"
			}} type="submit" variant="contained">Register</Button>
			{isLoading && <LinearProgress color="secondary" />}
			{error && <Alert sx={{ mt: "25px" }} severity="error">{error.message}</Alert>}
			{successAlert && <Alert sx={{ mt: "25px" }} severity="success">{successAlert}</Alert>}
		</Stack>
	</form>;
};

export default RegisterForm;