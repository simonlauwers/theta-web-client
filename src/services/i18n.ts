import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// "Inline" English and Arabic translations. 
// We can localize to any language and any number of languages.
const resources = {
	en: {
		translation: {
			app_name: "Theta Risk Game",
		},
	},
	nl: {
		translation: {
			app_name: "Theta Risk Spel",
		},
	},
};
i18next
	.use(initReactI18next)
	.init({
		resources,
		lng: "en",
		interpolation: {
			escapeValue: false,
		},
	});
export default i18next;