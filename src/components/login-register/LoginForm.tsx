import { Alert, Button, Divider, IconButton, InputAdornment, LinearProgress, Stack } from "@mui/material";
import React, { useState } from "react";
import WhiteTextField from "../theme/formInputs/WhiteTextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import useAuth from "../../hooks/UseAuth";
import LoginType from "../../types/LoginType";
import * as userApi from "../../api/user/UserApi";
import UserType from "../../types/UserType";
import { useMutation, useQueryClient } from "react-query";
import ResponseMessageType from "../../types/ResponseMessageType";
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import { convertErrorMessageToFriendlyMessage } from "../../utils/Utils";

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
	const { setUser } = useAuth();
	const queryClient = useQueryClient();
	const [error, setError] = useState<ResponseMessageType | null>(null);
	const navigate = useNavigate();


	const { mutate, isLoading } = useMutation(userApi.login, {
		onSuccess: (data: UserType) => {
			setUser(data);
			navigate("/home");
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

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchemaLogin,
		onSubmit: async (values: LoginType) => {
			const user = { ...values };
			mutate(user);
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
						<Button style={{ marginTop: 25, backgroundColor: "ghostwhite", color: "#141124", fontWeight: "bold", width: "100%" }} variant="contained"><FacebookIcon style={{ color: "#141124" }} fontSize="large"></FacebookIcon> Login via Facebook</Button>


					</div>

				</Stack>
			</form >
		</>
	);
};

export default LoginForm;