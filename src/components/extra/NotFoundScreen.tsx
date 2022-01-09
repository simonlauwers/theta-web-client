import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/context-hooks/UseAuth";

export const NotFoundScreen = () => {
	const { t } = useTranslation();
	const { user } = useAuth();

	return (
		<main style={{ padding: "1rem", background: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1) 100%)", height: "100vh", textAlign: "center" }}>
			<p style={{ color: "white", fontSize: 45, fontWeight: 700 }}>404 | {t("page_not_found")}!</p>
 
			<Link to="/home">
				<Button variant="contained" style={{ fontSize: 25, padding: 10 }}>
					{user ?
						"Back to home"
						:
						"Back to login"
					}
				</Button>
			</Link>

		</main>
	);
};
