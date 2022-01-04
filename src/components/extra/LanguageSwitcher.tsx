import { LanguageOutlined } from "@mui/icons-material";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Flags from "country-flag-icons/react/3x2";

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	return (
		<div>
			<SpeedDial
				ariaLabel="SpeedDial basic example"
				sx={{ position: "absolute", bottom: 16, right: 16 }}
				icon={<LanguageOutlined />}
			>
				<SpeedDialAction
					key={"en"}
					icon={<Flags.GB title="United States" style={{maxWidth:"70%"}}/>}
					onClick={() => {i18n.changeLanguage("en");}}
					title="English"
					tooltipTitle={"English"}
				/>
					<SpeedDialAction
					key={"nl"}
					icon={<Flags.NL title="United States" style={{maxWidth:"70%"}}/>}
					title="Dutch"
					onClick={() => {i18n.changeLanguage("nl");}}
					tooltipTitle={"Dutch"}
				/>
			</SpeedDial>
		</div>
	);
};

export default LanguageSwitcher;
