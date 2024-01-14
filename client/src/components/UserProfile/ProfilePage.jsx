import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MiniDrawer from "../Home/Minidrawer";
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import { HiTrophy } from "react-icons/hi2";
import { FaChessBoard } from "react-icons/fa6";

function ProfilePage() {
    const params = useParams()
    const [userDetails, setuserDetails] = useState({ loading: true })

    const { id } = params;
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/user/${id}`, { withCredentials: true })
                setuserDetails({ ...response.data, loading: false })
            } catch (error) {
                console.log(error)
            }
        }
        getUserDetails()
    }, [id])
    if (userDetails.loading) return (<div className='bg-background w-full h-full flex flex-row'>
        <MiniDrawer /> </div>);
    return (
        <div className='bg-background w-full h-full flex flex-row'>
            <MiniDrawer />
            <div className="flex flex-col items-start justify-start w-full px-20 py-28 gap-2">
                <span className="text-3xl font-semibold">Profile</span>
                <div className="flex flex-col items-center justify-center w-full px-20 py-12 gap-2">
                    <div className='flex flex-row items-center justify-between gap-4 w-full'>
                        <div className='flex flex-row w-fit'>
                            <img src={userDetails.profilePicture} alt="avatar" className="w-32 h-32 rounded-full" />
                            <div className='flex flex-col items-start justify-center w-full gap-3'>
                                <span className="text-3xl font-semibold">{userDetails.username}</span>
                                <span className="flex flex-row justify-start items-center gap-2 text-3xl font-semibold"><HiTrophy />{userDetails.rating}</span>
                            </div>
                        </div>
                        <div className='flex flex-col w-fit'>
                            <span className="text-xl">Stats:</span>
                            <span className="text-xl font-light">Wins: {userDetails.wins}</span>
                            <span className="text-xl font-light">Losses: {userDetails.losses}</span>
                            <span className="text-xl font-light">Draws: {userDetails.draws}</span>
                        </div>
                        <div className=''>
                            <button className='bg-border p-2 rounded-lg font-semibold flex flex-row items-center gap-2'>Challenge <FaChessBoard /></button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <span className="text-3xl font-semibold">Game History</span>
                    {userDetails.gameHistory.length === 0 ? <span className="text-md font-light">No games played yet</span> :
                        <span className="text-xl font-light">Games played</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage


