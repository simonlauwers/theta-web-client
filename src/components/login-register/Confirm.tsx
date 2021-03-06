import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { Link, useParams } from "react-router-dom";
import ResponseMessageType from "../../types/ResponseMessageType";
import UserType from "../../types/UserType";
import TokenType from "../../types/TokenType";
import * as userApi from "../../api/user/UserApi";
import { backgroundColor } from "../../theme/colors";

export const Confirm = () => {
	const { token } = useParams();
	const queryClient = useQueryClient();
	const [error, setError] = useState<ResponseMessageType | null>(null);
	const { mutate, isLoading } = useMutation(userApi.confirmAccount, {
		onSuccess: (data: UserType) => {
			console.log(data);
		},
		onError: (e: any) => {
			const rmt = e.response.data as ResponseMessageType;
			setError(rmt);
		},
		onSettled: () => {
			queryClient.invalidateQueries("create");
		}
	});

	useEffect(() => {
		setError(null);
		const confirmationToken = { token: token } as TokenType;
		return mutate(confirmationToken);
	}, [mutate, token]);

	// todo display errors, maybe refactor user-service to always return responsemessages and not user objects
	return (
		<>
			{isLoading ? <CircularProgress /> :
				<>
					{error && <div> An error occured </div>}
					<Grid item xs={12} md={6} lg={6} style={{
						backgroundColor: backgroundColor.main,
						height: "100vh"
					}}>
						<div style={{
							marginTop: "10%",
							marginLeft: "25%"
						}}>
							<h1 style={{ color: "ghostwhite" }}>Yeeha! Email is confirmed.</h1>
							<Link style={{ color: "white" }} to="/login">Back to Login.</Link>
						</div>
					</Grid>
				</>
			}


		</>
	);
};
