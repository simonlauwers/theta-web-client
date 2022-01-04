import React from "react";
import { useTranslation } from "react-i18next";

export const NotFoundScreen = () => {
	const { t } = useTranslation();

    return (
        <main style={{ padding: "1rem" }}>
            <p>404 | {t("page_not_found")}!</p>
        </main>
    );
};
