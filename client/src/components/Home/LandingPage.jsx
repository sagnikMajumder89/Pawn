import React from 'react'
import { FaRegChessQueen } from "react-icons/fa6";
import { TbBuildingCommunity } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import Navbar from '../Navbar/Navbar';

function LandingPage() {
    return (
        <>
            <Navbar />
            <div className='flex flex-col h-full'>
                <div className='flex flex-col grow justify-center items-center min-h-screen bg-background text-copy bg-no-repeat bg-top bg-cover bg-fixed' style={{ backgroundImage: `url(${'images/background.png'})`, backgroundBlendMode: 'multiply' }}>
                    <div className='text-4xl font-bold mt-16 max-w-prose text-center px-5' >
                        <span>The only place where you cannot make </span>
                        <span className='text-primary-content'>blunders.</span>
                    </div>
                    <div className='flex flex-row justify-center items-center p-5 m-5 gap-12'>
                        <button className='bg-gradient-to-l hover:bg-gradient-to-r from-primary-content to-primary rounded-full p-3'>
                            Signup now!
                        </button>
                        <button>Already a member?</button>
                    </div>
                </div>
                <div className='bg-foreground py-3'>
                    <div className='grid grid-cols-3 text-copy'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='rounded-full bg-border p-3'>
                                <FaRegChessQueen size={34} />
                            </div>
                            <div>
                                Test your skills
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='rounded-full bg-border p-3'>
                                <TbBuildingCommunity size={34} />
                            </div>
                            <div>
                                Build your own community
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='rounded-full bg-border p-3'>
                                <BiSupport size={34} />
                            </div>
                            <div>
                                Support 24x7
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default LandingPage