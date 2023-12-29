import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const items = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Watch", icon: <VisibilityIcon /> },
    { text: "Leaderboard", icon: <LeaderboardIcon /> },
    { text: "About", icon: <InfoIcon /> },
    { text: "Contact Us", icon: <ChatIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
];

export default function Sidebar() {
    const [state, setState] = React.useState({ left: false });

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ left: open });
    };

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {items.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <ArrowForwardIosIcon style={{ transform: state.left ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: 'white' }} />
            </Button>
            <SwipeableDrawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list}
            </SwipeableDrawer>
        </div>

    );
}
