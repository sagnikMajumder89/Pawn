import React from 'react'
import { TiTick } from "react-icons/ti";
function SelectFriend({ setOpponentId }) {

    const Friends = [
        {
            id: 1,
            name: 'John Doe',
            rating: 1200,
            profilePic: '#'
        },
        {
            id: 2,
            name: 'Bhavya Jain',
            rating: 800,
            profilePic: '#'
        },
        {
            id: 3,
            name: 'Krishna Agarwal',
            rating: 900,
            profilePic: '#'
        },
    ]

    return (
        <div className='flex flex-col p-5 items-center w-full'>
            <span className='font-semibold m-2 mb-4 text-2xl'>
                Select your opponent
            </span>
            <div className='flex flex-col items-center justify-center w-full'>
                {Friends.map((friend, index) => (
                    <div key={index} className='flex flex-row items-center justify-between w-full p-2 my-2 bg-background bg-opacity-35 rounded-lg'>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <img src={friend.profilePic} alt="" className='w-12 h-12 rounded-full m-2' />
                            <div className='flex flex-col'>
                                <span className='font-semibold text-lg mb-1'>
                                    {friend.name}
                                </span>
                                <span className='font-light text-md'>
                                    {friend.rating}
                                </span>
                            </div>
                        </div>
                        <button onClick={() => setOpponentId(friend.id)} className='bg-copy-lighter bg-opacity-40 rounded-full text-md w-1/5 p-1 font-semibold text-copy mr-3'>
                            <span className='flex flex-row items-center justify-center gap-2'>
                                <TiTick size={24} />
                            </span>
                        </button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default SelectFriend