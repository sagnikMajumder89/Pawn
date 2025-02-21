import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import TournamentIcon from '@mui/icons-material/EmojiEvents';
import AndroidIcon from '@mui/icons-material/Android';
import SchoolIcon from '@mui/icons-material/School';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TimerIcon from '@mui/icons-material/Timer';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ProfileMenu from './ProfileMenu';
import MessagesMenu from './MessagesMenu';
import FriendsDialog from './FriendsDialogBox';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 250;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const items1 = [
    {
        text: 'Home',
        icon: <HomeIcon sx={{ color: 'white' }} />,
        link: '/home'
    },
    {
        text: 'Play',
        icon: <TimerIcon sx={{ color: 'white' }} />,
        link: '/play'
    },
    {
        text: 'Tournaments',
        icon: <TournamentIcon sx={{ color: 'white' }} />,
        link: '/tournaments'
    },
    {
        text: 'Learn from the Masters',
        icon: <SchoolIcon sx={{ color: 'white' }} />,
        link: '/learn'
    },
    {
        text: 'Watch Live Games',
        icon: <VisibilityIcon sx={{ color: 'white' }} />,
        link: '/watch'
    }
];
const items2 = [
    {
        text: 'Contact Us',
        icon: <ContactMailIcon sx={{ color: 'white' }} />,
        link: '/contact'
    },
    {
        text: 'About Us',
        icon: <InfoIcon sx={{ color: 'white' }} />,
        link: '/about'
    },
    {
        text: 'Privacy Policy',
        icon: <PrivacyTipIcon sx={{ color: 'white' }} />,
        link: '/privacy'
    },
    {
        text: 'Feedback',
        icon: <FeedbackIcon sx={{ color: 'white' }} />,
        link: '/feedback'
    }
];


//widget
export default function MiniDrawer() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} elevation={2}>
                <Toolbar className='bg-background'>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <div className='flex w-full h-full justify-between items-center'>
                        <div className="text-2xl font-bold text-copy">Chess.play</div>
                        <div className='flex flex-row'>
                            <FriendsDialog />
                            <MessagesMenu />
                            <ProfileMenu />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{ backgroundColor: "#202d29" }} >
                <DrawerHeader >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List >
                    {items1.map((item, index) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate(item.link)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" sx={{ opacity: open ? 1 : 0, fontWeight: 'Bold' }}>
                                            {item.text}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Divider />
                    {items2.map((item, index) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => navigate(item.link)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" sx={{ opacity: open ? 1 : 0, fontWeight: 'Bold' }}>
                                            {item.text}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
