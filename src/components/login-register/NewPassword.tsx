/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Stack, Snackbar, Alert, InputAdornment, IconButton, Button, LinearProgress } from "@mui/material";

import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import WhiteTextField from "../theme/formInputs/WhiteTextField";
import * as userApi from "../../api/user/UserApi";
import { useMutation, useQueryClient } from "react-query";
import ResponseMessageType from "../../types/ResponseMessageType";
import UserType from "../../types/UserType";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

const validationSchemaNewPassword = yup.object({
	newPassword: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/, "Must contain 8 characters, one uppercase and one lowercase").required("Password is required"),
	confirmNewPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
});

export const NewPassword = () => {
	const [error, setError] = useState<ResponseMessageType | null>(null);
	const [successAlert, setSuccessAlert] = useState<ResponseMessageType | null>(null);
	const queryClient = useQueryClient();
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showFormErrorSnackbar, setShowFormErrorSnackbar] = useState(false);

	const { token } = useParams();

	const { mutate, isLoading } = useMutation(userApi.resetPassword, {
		onSuccess: (data: UserType) => {
			console.log(data);
			console.log("password changed!");
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			console.log(rmt);
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
			newPassword: "",
			confirmNewPassword: "",
			resetPasswordToken: token!
		},
		validationSchema: validationSchemaNewPassword,
		onSubmit: (values: any) => {
			setSuccessAlert(null);
			const resetPassword = { ...values };
			mutate(resetPassword);
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

			<WhiteTextField label="newPassword" style={{
				marginTop: 25
			}} id="newPassword" name="newPassword" type={showPassword ? "text" : "password"} variant="filled" autoComplete="off" value={formik.values.newPassword} onChange={formik.handleChange} error={formik.touched.newPassword && Boolean(formik.errors.newPassword)} InputProps={{
				endAdornment: <InputAdornment position="end">
					<IconButton aria-label="toggle password visibility" onClick={() => {
						handleClickShowPassword(false);
					}} edge="end">
						{showPassword ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</InputAdornment>
			}} />

			<PasswordStrengthBar password={formik.values.newPassword} minLength={8} />

			{formik.errors.newPassword && formik.touched.newPassword ? <div style={{
				color: "white"
			}}>{"Uh oh... " + formik.errors.newPassword}</div> : null}

			<WhiteTextField label="Confirm your password" style={{
				marginTop: 25
			}} id="confirmNewPassword" name="confirmNewPassword" autoComplete="off" type={showPasswordConfirmation ? "text" : "password"} variant="filled" value={formik.values.confirmNewPassword} onChange={formik.handleChange} error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)} InputProps={{
				endAdornment: <InputAdornment position="end">
					<IconButton aria-label="toggle password visibility" onClick={() => {
						handleClickShowPassword(true);
					}} edge="end">
						{showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</InputAdornment>
			}} />
			{formik.errors.confirmNewPassword && formik.touched.confirmNewPassword ? <div style={{
				color: "white"
			}}>{"Uh oh... " + formik.errors.confirmNewPassword}</div> : null}

			<Button style={{
				marginTop: 25,
				backgroundColor: "ghostwhite",
				color: "#141124",
				fontWeight: "bold"
			}} type="submit" variant="contained">Reset</Button>

			{isLoading && <LinearProgress color="secondary" />}
			{error && <Alert sx={{ mt: "25px" }} severity="error">{error.message}</Alert>}
			{successAlert && <Alert sx={{ mt: "25px" }} severity="success">{successAlert}</Alert>}
		</Stack>
	</form>;
};
