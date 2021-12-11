import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import BarChartIcon from "@mui/icons-material/BarChart";

const drawerWidth = "10%";
const iconColor = "989898";

export interface HomeLayoutDrawerProps {
    children: JSX.Element
}

export default function HomeLayoutDrawer(props: HomeLayoutDrawerProps) {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar><img src="https://developer.sas.com/guides/r/_jcr_content/par/styledcontainer_1d31/par/image.img.png/1630325230865.png" alt="" width="70" height="70" style={{ marginTop: "25%", marginLeft: "4%" }} /></Toolbar>
			<Divider style={{ marginTop: "25%", marginBottom: "25%" }} />
			<List >
				{["Profile", "Stats", "Settings", "Help"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon >
							{index === 0 ? <AccountCircleIcon style={{ fontSize: "2.5em", marginLeft: "50%", color: iconColor }} /> : null}
							{index === 1 ? <BarChartIcon style={{ fontSize: "2.5em", marginLeft: "50%", color: iconColor }} /> : null}
							{index === 2 ? <SettingsIcon style={{ fontSize: "2.5em", marginLeft: "50%", color: iconColor }} /> : null}
							{index === 3 ? <HelpIcon style={{ fontSize: "2.5em", marginLeft: "50%", color: iconColor }} /> : null}
						</ListItemIcon>

					</ListItem>
				))}
			</List>
		</div>
	);


	return (
		<Box sx={{ display: "flex" }}>
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
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
				>
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

	);
}