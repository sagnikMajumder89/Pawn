import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CgProfile } from "react-icons/cg";
import IconButton from '@mui/material/IconButton';
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { IoHelp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (vs) => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/logout`, { withCredentials: true })
            navigate('/')
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <IconButton
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <div className='rounded-full h-8 w-8 p-1 flex items-center justify-center bg-opacity-50'>
                    <CgProfile style={{ color: 'white' }} size={35} />
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
                    <div className='flex flex-row items-center gap-2 mb-2'>
                        <FaUser style={{ color: 'white' }} />
                        My Profile
                    </div>
                </MenuItem>
                <MenuItem onClick={() => handleClose('Random')}>
                    <div className='flex flex-row items-center gap-2 mb-2'>
                        <FaCartShopping style={{ color: 'white' }} />
                        Subscriptions
                    </div>
                </MenuItem>
                <MenuItem onClick={() => handleClose('Random')}>
                    <div className='flex flex-row items-center gap-2 mb-2'>
                        <IoMdSettings style={{ color: 'white' }} />
                        Settings
                    </div>
                </MenuItem>
                <MenuItem onClick={() => handleClose('Random')}>
                    <div className='flex flex-row items-center gap-2 mb-2'>
                        <IoHelp style={{ color: 'white' }} />
                        Help
                    </div>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <div className='flex flex-row items-center gap-2 mb-2'>
                        <RiLogoutBoxLine style={{ color: 'white' }} />
                        Logout
                    </div>
                </MenuItem>

            </Menu>
        </div>
    );
}
