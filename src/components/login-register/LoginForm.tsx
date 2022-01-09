import { Alert, Button, Divider, IconButton, InputAdornment, LinearProgress, Stack } from "@mui/material";
import React, { useState } from "react";
import WhiteTextField from "../theme/formInputs/WhiteTextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import useAuth from "../../hooks/context-hooks/UseAuth";
import LoginType from "../../types/LoginType";
import * as userApi from "../../api/user/UserApi";
import UserType from "../../types/UserType";
import { useMutation } from "react-query";
import ResponseMessageType from "../../types/ResponseMessageType";
import { Link, useNavigate } from "react-router-dom";
import { convertErrorMessageToFriendlyMessage } from "../../utils/Utils";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";

const validationSchemaLogin = yup.object({
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.required("Password is required"),
});
const LoginForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [error, setError] = useState<ResponseMessageType | null>(null);
	const navigate = useNavigate();
	const { setUser, refetch } = useAuth();

	const { mutate: mutateGoogle } = useMutation(userApi.loginWithGoogle, {
		onSuccess: (data: UserType) => {
			console.log(data);
			refetch();
			setUser(data);
			navigate("/home");
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			rmt.message = convertErrorMessageToFriendlyMessage(rmt.message);
			setError(rmt);
		}
	});

	const { mutate: mutateLocal, isLoading } = useMutation(userApi.login, {
		onSuccess: (data: UserType) => {
			refetch();
			setUser(data);
			navigate("/home");
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			rmt.message = convertErrorMessageToFriendlyMessage(rmt.message);
			setError(rmt);
		}
	});

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSuccess = (response: any) => {
		console.log(response);
		mutateGoogle(response.profileObj);
	};

	const onFailure = (response: any) => {
		console.log(response);
	};


	const formik = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validationSchema: validationSchemaLogin,
		onSubmit: async (values: LoginType) => {
			const user = { ...values };
			mutateLocal(user);
		},
	});

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Stack style={{ maxWidth: "50%" }}>
					<WhiteTextField
						label="Email"
						id="email"
						variant="filled"
						name="email"
						autoComplete="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
					/>
					{formik.errors.email && formik.touched.email ? (<div style={{ color: "white" }}>{"Uh oh... " + formik.errors.email}</div>) : null}

					<WhiteTextField
						label="Password"
						style={{ marginTop: 25 }}
						id="password"
						name="password"
						autoComplete="current-password"
						type={showPassword ? "text" : "password"}
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

					{isLoading && <LinearProgress color="secondary" />}
					{error && <Alert sx={{ mt: "25px" }} severity="error">{error.message}</Alert>}
					<Link style={{ color: "white", marginTop: 15 }} to="/reset-password-email">Forgot password?</Link>


					<div>
						<Divider><p style={{ color: "white" }}>OR</p></Divider>
						<GoogleLogin
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
							buttonText="Sign in"
							onSuccess={onSuccess}
							onFailure={onFailure}
							cookiePolicy={"single_host_origin"}
							render={renderProps => (
								<Button variant="contained" onClick={renderProps.onClick} sx={{ backgroundColor: "ghostwhite", color: "#141124", fontWeight: "bold", width: "100%" }} startIcon={<GoogleIcon />}>Log in with Google</Button>
							)}

						/>

					</div>

				</Stack>
			</form >
		</>
	);
};

export default LoginForm;