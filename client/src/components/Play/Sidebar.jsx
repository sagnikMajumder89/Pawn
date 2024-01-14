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
import { useNavigate } from "react-router-dom";


const items = [
    {
        text: "Home",
        icon: <HomeIcon />,
        link: "/home"
    },

    {
        text: "Watch",
        icon: <VisibilityIcon />,
        link: "/watch"
    },

    {
        text: "Leaderboard",
        icon: <LeaderboardIcon />,
        link: "/leaderboard"
    },

    {
        text: "About",
        icon: <InfoIcon />,
        link: "/about"
    },

    {
        text: "Contact Us",
        icon: <ChatIcon />,
        link: "/contact"
    },

    {
        text: "Settings",
        icon: <SettingsIcon />,
        link: "/settings"
    },

];

export default function Sidebar() {
    const [state, setState] = React.useState({ left: false });
    const navigate = useNavigate();
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
                        <ListItemButton onClick={() => navigate(item.link)}>
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
