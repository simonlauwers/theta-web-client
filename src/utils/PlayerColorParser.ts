/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */

export default interface PlayerColor {
	main : string;
	light : string;
	dark : string;
};

export default function parsePlayerColor (color : string) {
	switch(color) {
	case "RED":
		return {main : "#F44336", light : "#E57373", dark : "#D32F2F"};
	case "ORANGE":
		return {main : "#FF9800", light : "#FFB74D", dark : "#F57C00"};
	case "YELLOW":
		return {main : "#FFEB3B", light : "#FFF176", dark : "#FBC02D"};
	case "GREEN":
		return {main : "#4CAF50", light : "#81C784", dark : "#388E3C"};
	case "BLUE":
		return {main : "#03A9F4", light : "#4FC3F7", dark : "#0288D1"};
	case "PURPLE":
		return {main : "#9C27B0", light : "#BA68C8", dark : "#7B1FA2"};
	case "PINK":
		return {main : "#E91E63", light : "#F06292", dark : "#C2185B"};
	default:
		return null;
	}
}