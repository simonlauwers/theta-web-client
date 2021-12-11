import { Alert, Button, LinearProgress, Stack } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import * as userApi from "../../api/user/UserApi";
import EmailType from "../../types/EmailType";
import ResponseMessageType from "../../types/ResponseMessageType";
import UserType from "../../types/UserType";
import WhiteTextField from "../theme/formInputs/WhiteTextField";
import * as yup from "yup";


const validationSchemaEmail = yup.object({
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),
});

export const ResetPasswordEmail = () => {
	const queryClient = useQueryClient();
	const [error, setError] = useState<ResponseMessageType | null>(null);
	const [response, setResponse] = useState<ResponseMessageType | null>(null);
	const { mutate, isLoading } = useMutation(userApi.sendForgotPasswordEmail, {
		onSuccess: (data: ResponseMessageType) => {
			setResponse(data);
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
	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: validationSchemaEmail,
		onSubmit: async (email: EmailType) => {
			setResponse(null);
			console.log("submtting");
			mutate(email);
		}
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
					<Button style={{ marginTop: 25, backgroundColor: "ghostwhite", color: "#141124", fontWeight: "bold" }} type="submit" variant="contained">Send email</Button>

					{isLoading && <LinearProgress color="secondary" />}
					{error && <Alert sx={{ mt: "25px" }} severity="error">{error.message}</Alert>}
				</Stack>
				<p>{response?.message}</p>
			</form >

		</>
	);
};
