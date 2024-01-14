import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { IoNotificationsCircleOutline } from "react-icons/io5";

export default function MessagesMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (vs) => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <div className='rounded-full h-8 w-8 flex items-center justify-center bg-opacity-50'>
                    <IoNotificationsCircleOutline style={{ color: 'white' }} size={35} />
                </div>
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClose('Random')}>
                    No new notifications / messages
                </MenuItem>



            </Menu>
        </div>
    );
}
