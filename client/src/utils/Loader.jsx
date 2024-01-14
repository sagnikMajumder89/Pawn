import Lottie from 'lottie-react'
import React from 'react'

function Loader() {
    return (
        <div className='w-full h-full flex items-center justify-center bg-primary-light p-1 rounded-full'>
            <Lottie animationData={require('./circle_loader.json')} />
        </div>
    )
}

export default Loader