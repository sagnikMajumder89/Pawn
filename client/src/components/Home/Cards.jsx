import React from 'react'

function Cards(props) {
    return (
        <div className='flex flex-col items-center justify-center m-3 mt-5 cursor-pointer'>
            <div className='flex flex-col items-center justify-center text-center bg-secondary rounded-2xl p-6 gap-2'>
                <div className='w-11/12 h-11/12'>
                    <img src={`${props.image}`} alt='chess'
                    />
                </div>
                <div className='mt-2 flex flex-col gap-2 w-11/12 h-4/12'>
                    <div className='text-xl font-semibold'>{`${props.title}`}</div>
                    <div className='text-md font-light'>{`${props.subtitle}`}</div>
                </div>
            </div>
        </div>
    )
}

export default Cards