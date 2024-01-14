import React, { useEffect } from 'react'
import { IoTrophyOutline } from "react-icons/io5";
import Lottie from "lottie-react";
import loader from '../../utils/bar-loader.json'
import { useSocket } from '../../providers/socketContext';

function FIndingGame({ toggle, userDetails, values }) {

    const socket = useSocket()

    useEffect(() => {
        socket.emit("findGame", { userId: userDetails._id, socketId: socket.id, time: values })
    })
    return (
        <div className='flex flex-col w-full h-full items-center justify-center p-5 gap-2'>
            <span className='font-semibold text-2xl'>
                Waiting for opponent . . .
            </span >
            <span className='font-light mt-2 text-xl'>
                <div className='flex flex-row gap-2 items-center justify-center'>
                    Your rating: <IoTrophyOutline /> {userDetails.rating}
                </div>
            </span>
            <div className='w-1/3'>
                <Lottie animationData={loader} />
            </div>
            <button onClick={toggle}
                className='bg-copy-lighter bg-opacity-40 rounded-full text-md w-2/5 p-2 font-semibold text-copy'>
                <span className='flex flex-row items-center justify-center gap-2'>
                    Cancel
                </span>
            </button>
        </div>
    )
}

export default FIndingGame