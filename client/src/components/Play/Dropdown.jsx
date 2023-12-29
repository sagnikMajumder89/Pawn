import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoMdArrowDropdown } from "react-icons/io";
export default function SimpleMenu({ item, setItem }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (vs) => {
        setAnchorEl(null);
        if (typeof vs !== 'string') return;
        setItem(vs);
    };

    return (
        <div className='flex flex-col w-3/5'>
            <button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className='bg-copy-lighter bg-opacity-40 rounded-full text-xl w-full px-3 py-3 font-semibold text-copy'
            >
                <span className='flex flex-row items-center justify-center gap-2'>
                    {`${item}`}
                    <IoMdArrowDropdown size={24} />

                </span>
            </button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClose('Random')}>Random</MenuItem>
                <MenuItem onClick={() => handleClose('Friend')}>Friend</MenuItem>
                <MenuItem onClick={() => handleClose('Computer')}>Computer</MenuItem>
            </Menu>
        </div>
    );
}
