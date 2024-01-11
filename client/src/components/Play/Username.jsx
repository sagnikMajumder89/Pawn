import React from 'react'
import { IoTrophyOutline } from "react-icons/io5";

function Username({ username, rating, profilePic }) {
    return (

        <div className='flex flex-row items-center'>
            <img src={profilePic} alt="ProfilePicture" className='w-12 h-12 rounded-full m-2' />
            <div className='flex flex-col'>
                <span className='text-copy font-semibold '>{`${username}`}</span>
                <span className='text-copy font-semibold flex flex-row items-center gap-1'>
                    <IoTrophyOutline /> {rating}
                </span>
            </div>
        </div>
    )
}

export default Username