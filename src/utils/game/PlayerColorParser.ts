/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-extra-semi */

export default interface PlayerColor {
	main : string;
	light : string;
	dark : string;
	gradient : string;
};

export default function parsePlayerColor (color : string) {
	switch(color) {
	case "RED":
		return {main : "#F44336", light : "#E57373", dark : "#D32F2F", gradient: "linear-gradient(180deg, rgba(79,18,16,1) 0%, rgba(41,5,25,1) 100%)"};
	case "ORANGE":
		return {main : "#FF5722", light : "#FF8A65", dark : "#E64A19", gradient: "linear-gradient(180deg, rgba(79,38,16,1) 0%, rgba(41,5,10,1) 100%)"};
	case "YELLOW":
		return {main : "#FFEB3B", light : "#FFF176", dark : "#FBC02D", gradient: "linear-gradient(180deg, rgba(79,67,16,1) 0%, rgba(41,17,5,1) 100%)"};
	case "GREEN":
		return {main : "#4CAF50", light : "#81C784", dark : "#388E3C", gradient: "linear-gradient(180deg, rgba(0,49,15,1) 0%, rgba(0,36,33,1) 100%)"};
	case "BLUE":
		return {main : "#03A9F4", light : "#4FC3F7", dark : "#0288D1", gradient: "linear-gradient(180deg, rgba(0,39,67,1) 0%, rgba(14,14,56,1) 100%)"};
	case "PURPLE":
		return {main : "#673AB7", light : "#9575CD", dark : "#512DA8", gradient: "linear-gradient(180deg, rgba(30,16,79,1) 0%, rgba(5,14,41,1) 100%)"};
	case "PINK":
		return {main : "#E91E63", light : "#F06292", dark : "#C2185B", gradient: "linear-gradient(180deg, rgba(79,16,60,1) 0%, rgba(35,5,41,1) 100%)"};
	default:
		return null;
	}
}