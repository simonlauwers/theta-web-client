import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import * as userApi from "../../api/user/UserApi";
import { useMutation } from "react-query";
import ResponseMessageType from "../../types/ResponseMessageType";
import { Theme, useMediaQuery } from "@mui/material";
import { backgroundColor } from "../../theme/colors";
import { CloseOutlined, MenuOutlined } from "@mui/icons-material";

const drawerWidth = 240;
const iconColor = "989898";

export interface HomeLayoutDrawerProps {
	children: JSX.Element
}


export default function HomeLayoutDrawer(props: HomeLayoutDrawerProps) {
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const { mutate } = useMutation(userApi.logOut, {
		onSuccess: (data: ResponseMessageType) => {
			navigate("/login");
		}
	});

	const mobileMediaQuery = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));


	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleLogOut = () => {
		mutate();
	};

	const itemList = [
		{
			key: "home",
			icon: <HomeIcon style={{ fontSize: "2.5em", marginLeft: "50%", color: iconColor }} />,
			onClick: () => navigate("/home")
		},
		{
			key: "profile",
			icon: <AccountCircleIcon style={{ fontSize: "2.5em", marginLeft: "50%", color: iconColor }} />,
			onClick: () => navigate("/profile")
		},
		{
			key: "stats",
			icon: <BarChartIcon style={{ fontSize: "2.5em", marginLeft: "50%", color: iconColor }} />,
			onClick: () => navigate("/stats")
		},
		{
			key: "settings",
			icon: <SettingsIcon style={{ fontSize: "2.5em", marginLeft: "50%", color: iconColor }} />,
			onClick: () => navigate("/settings")
		},
		{
			key: "logout",
			icon: <LogoutIcon style={{ fontSize: "2.5em", marginLeft: "50%", color: iconColor }} />,
			onClick: () => handleLogOut()
		}
	];

	const drawer = (
		<div>
			<Toolbar><img src="./media/photos/game-branding/logoWhiteTransparant.svg" alt="" width="70" height="70" style={{ marginTop: "25%", marginLeft: "4%" }} /></Toolbar>
			<Divider style={{ marginTop: "25%", marginBottom: "25%", borderColor: "transparent" }} />
			<List>
				{itemList.map((item, key) => {
					const { icon, onClick } = item;
					return (
						<ListItem button key={key} onClick={onClick}>
							{icon && <ListItemIcon>{icon}</ListItemIcon>}
						</ListItem>
					);
				})}
			</List>
		</div>
	);


	return (
		<>
			{mobileMediaQuery ?
				<div onClick={() => {
					handleDrawerToggle();
				}} style={{ paddingTop: 20, paddingLeft: 25, marginBottom: 25, zIndex: 8888 }}>
					<MenuOutlined style={{ fontSize: 35, color: "white" }} />
				</div> : null}
			<Box component="div" sx={{ display: "flex" }}>
				<AppBar
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` },
					}}
				>
				</AppBar>
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					<Drawer
						variant="persistent"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							zIndex: 9999,
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, background: backgroundColor.main },
						}}
					>
						<div onClick={() => { 
							handleDrawerToggle();
						}} style={{ paddingTop: 20, paddingLeft: 25, marginBottom: 25, zIndex: 8888 }}>
							<CloseOutlined style={{ fontSize: 35, color: "white" }} />
						</div>
						{drawer}
					</Drawer>
					<Drawer
						ModalProps={{
							keepMounted: true,
						}}
						variant="permanent"
						sx={{
							display: { xs: "none", sm: "block" },
							"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, background: "linear-gradient(90deg, rgba(0,0,0,0.49093140674238445) 0%, rgba(0,0,0,0) 100%)", border: "none" },
							"& ": {},
						}}
						open
					>
						{drawer}
					</Drawer>
				</Box>

				{props.children}

			</Box>
		</>

	);

}