import axios from 'axios';
import React from 'react'
import { IoPersonAddSharp } from "react-icons/io5";
import CustomizedSnackbars from '../Snackbar/Snackbar';
function FriendTitle({ friend }) {
    const [openSnackbar, setOpenSnackbar] = React.useState({ open: false, type: '', message: '' })
    const handleCloseSnackbar = () => {
        setOpenSnackbar({ ...openSnackbar, open: false })
    }
    const handleAddFriend = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/sendFriendRequest`, { friendId: friend._id }, { withCredentials: true })
            setOpenSnackbar({ open: true, type: 'success', message: response.data.message })
        } catch (error) {
            setOpenSnackbar({ open: true, type: 'error', message: error.response.data.message })
        }
    }
    return (<>
        <div className='flex flex-row items-center justify-between w-full p-2 my-2 bg-background bg-opacity-35 rounded-lg'>
            <div className='flex flex-row items-center justify-center gap-2'>
                <img src={friend.profilePicture} alt="" className='w-12 h-12 rounded-full m-2' />
                <div className='flex flex-col'>
                    <span className='font-semibold text-lg mb-1'>
                        {friend.username}
                    </span>
                    <span className='font-light text-md'>
                        {friend.rating}
                    </span>
                </div>
            </div>

            <button onClick={handleAddFriend} className='bg-copy-lighter bg-opacity-40 rounded-full text-md w-1/5 h-8 p-1 text-md text-copy mr-3'>
                <span className='flex flex-row items-center justify-center gap-2'>
                    Add
                    <IoPersonAddSharp />
                </span>
            </button>
        </div>
        {openSnackbar && <CustomizedSnackbars type={openSnackbar.type} message={openSnackbar.message} open={openSnackbar.open} handleClose={handleCloseSnackbar} />}
    </>
    )
}
export default FriendTitle