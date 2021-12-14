import { createTheme } from "@mui/material/styles";
import { error, grey, primary, secondary, success, warning } from "./colors";



const fontSize = 14;

const fontFamily = ["Open Sans", "Roboto", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"].join(",");

const themeWithBreakpoints = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920
		}
	}
}); // Create a theme instance.

const thetaTheme = createTheme({
	palette: {
		primary: {
			...primary,
			light: primary[100]
		},
		secondary,
		error,
		warning,
		success,
		text: {
			primary: grey[900],
			secondary: grey[800],
			disabled: grey[400]
		},
		divider: grey[200],
		grey: {
			...grey
		},
		background: {
			default: grey[100]
		}
	},
	typography: {
		fontSize,
		fontFamily,
		htmlFontSize: 16,
		body1: {
			fontSize
		},
		body2: {
			fontSize
		}
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				ul: {
					margin: 0,
					padding: 0,
					listStyle: "none"
				},
				p: {
					lineHeight: 1.75
				},
				a: {
					textDecoration: "none",
					color: "inherit"
				},
				button: {
					fontFamily,
					fontSize
				},
				"#nprogress .bar": {
					position: "fixed",
					top: 0,
					left: 0,
					height: "3px !important",
					borderRadius: "0px 300px 300px 0px !important",
					zIndex: 1031,
					background: `${primary[500]} !important`,
					overflow: "hidden"
				},
				"#nprogress .peg": {
					boxShadow: `0 0 10px ${primary[500]}, 0 0 5px ${primary[500]} !important`
				}
			}
		},
		MuiPagination: {
			defaultProps: {
				variant: "outlined",
				color: "primary"
			}
		},
		MuiTextField: {
			defaultProps: {
				size: "small",
				variant: "outlined"
			}
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					paddingTop: 8,
					paddingBottom: 8
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					textTransform: "capitalize",
					minWidth: 0,
					minHeight: 0
				}
			},
			defaultProps: {
				color: "inherit"
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: "8px"
				}
			}
		},
		MuiContainer: {
			styleOverrides: {
				root: {
					[themeWithBreakpoints.breakpoints.up("sm")]: {
						paddingLeft: "1rem",
						paddingRight: "1rem"
					}
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 8
				}
			}
		}
	}
});

const theme = {
	...themeWithBreakpoints,
	...thetaTheme
};


theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";

export default theme;