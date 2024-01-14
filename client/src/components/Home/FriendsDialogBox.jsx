import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import { FaUserFriends } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoPersonAddSharp } from "react-icons/io5";
import { MdPersonRemove } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";

export default function FriendsDialog() {
    const [open, setOpen] = React.useState(false);
    const [friends, setFriends] = React.useState([])
    const [friendRequests, setFriendRequests] = React.useState([])

    const navigate = useNavigate();

    const handleClickOpen = () => {
        getFriends();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getFriends = async () => {

        try {
            const resFriendRequest = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/getFriendRequests`, { withCredentials: true })
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/getFriends`, { withCredentials: true })
            setFriends(res.data)
            setFriendRequests(resFriendRequest.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddFriendBtn = () => {
        navigate('/addFriend')
        handleClose()
    }

    const addFriend = async (friendId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/acceptFriendRequest`, { friendId }, { withCredentials: true })
            console.log(response.data)
            getFriends()
        } catch (error) {
            console.log(error)
        }
    }

    const removeFriendReq = async (friendId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/removeFriendRequest`, { friendId }, { withCredentials: true })
            console.log(response.data)
            getFriends()
        } catch (error) {
            console.log(error)
        }
    }


    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`)
        handleClose()
    }

    const handleSearchFriends = (event) => {

        try {
            const search = event.target.value.trim();
            if (search !== null || search !== '' || search !== undefined || search.length >= 3) {
                const filteredFriends = friends.filter(friend => friend.username.toLowerCase().includes(search.toLowerCase()))
                setFriends(filteredFriends)
            }
        } catch (error) {

        }
    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <IconButton
                aria-label="Friends"
                onClick={handleClickOpen}
            >
                <FaUserFriends style={{ color: 'white' }} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" style={{ fontWeight: 'bold' }}>Your Friends</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <span className='flex flex-col w-full h-full items-start justify-center'>
                            <span className='m-2'>
                                <input
                                    type="text"
                                    placeholder='Search by username'
                                    onChange={handleSearchFriends}
                                    maxLength={20}
                                    className='w-[24rem] h-12 bg-foreground text-copy-lighter border-2 rounded-lg border-border border-opacity-50 focus:border-border focus:text-copy transition duration-200 outline-none px-6 text-md'
                                />
                            </span>
                            <span className='flex flex-col gap-2 w-full px-2'>
                                <span className='font-semibold text-lg mb-1'>
                                    Friend Requests
                                </span>
                                {friendRequests.length === 0 ?
                                    <span className='flex flex-col items-start justify-center gap-4'>
                                        You have no friend requests
                                    </span> : friendRequests.map((friend, index) => {
                                        return (
                                            <span key={index} className='flex flex-row w-full items-center justify-between mb-2'>
                                                <span className='flex flex-row items-center gap-4'>
                                                    <img src={friend.profilePicture} alt="profile" className='w-8 h-8 rounded-full' />
                                                    {friend.username}
                                                </span>
                                                <span className='flex flex-row items-center justify-center gap-2'>
                                                    <IconButton onClick={() => addFriend(friend._id)}>
                                                        <IoPersonAddSharp style={{ color: 'green' }} size={20} />
                                                    </IconButton>
                                                    <IconButton onClick={() => removeFriendReq(friend._id)}>
                                                        <MdPersonRemove style={{ color: 'red' }} size={25} />
                                                    </IconButton>
                                                </span>
                                            </span>
                                        )
                                    }
                                    )}
                                <span className='flex flex-row justify-between font-semibold text-lg'>
                                    Friends
                                    <button onClick={handleAddFriendBtn} className='text-secondary-content text-sm p-2 rounded-xl'>Add Friends</button>
                                </span>
                                {friends.length === 0 ?
                                    <span className='flex flex-col items-start justify-center gap-4'>
                                        You have'nt added any friends yet

                                    </span>
                                    : friends.map((friend, index) => {
                                        return (
                                            <span key={index} onClick={() => handleUserClick(friend._id)} className='flex flex-row items-center justify-between w-full bg-background border-border border-2 px-4 h-12 rounded-sm cursor-pointer hover:opacity-80'>
                                                <span className='flex flex-row items-center w-full gap-2'>
                                                    <img src={friend.profilePicture} alt="profile" className='w-8 h-8 rounded-full' />
                                                    {friend.username}
                                                </span>
                                                <FaArrowCircleRight />
                                            </span>
                                        )
                                    }
                                    )}
                            </span>
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className='text-copy'>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}