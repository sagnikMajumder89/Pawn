import React from 'react'
import SimpleMenu from './Dropdown'
import { TbChess } from "react-icons/tb";


function TimeControls({ values, handleBlur, handleChange, handleSubmit, errors, item, setItem }) {
    return (
        <>
            <span className='font-semibold m-2 text-2xl'>
                Time Controls
            </span>
            <div className='flex flex-col items-center justify-center m-5 w-full'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                    <div className='flex flex-row items-center justify-center'>
                        <label className='relative w-full px-5 py-2'>
                            <span className='text-copy text-sm text-opacity-80'>
                                Hours
                            </span>
                            <input
                                type="number"
                                name='hours'
                                value={values.hours}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='h-12 w-full bg-foreground text-copy-lighter border-2 rounded-lg border-border border-opacity-50 focus:border-border focus:text-copy transition duration-200 outline-none px-6 text-md' />

                            {errors.hours && <span className='text-error-content'>{errors.hours}</span>}
                        </label>
                        <label className='relative w-full px-5 py-2'>
                            <span className='text-copy text-sm text-opacity-80'>
                                Minutes
                            </span>
                            <input
                                type="number"
                                name='minutes'
                                value={values.minutes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='h-12 w-full bg-foreground text-copy-lighter border-2 rounded-lg border-border border-opacity-50 focus:border-border focus:text-copy transition duration-200 outline-none px-6 text-md' />

                            {errors.minutes && <span className='text-error-content'>{errors.minutes}</span>}
                        </label>
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        <label className='relative w-full px-5 py-2'>
                            <span className='text-copy text-sm text-opacity-80'>
                                Seconds
                            </span>
                            <input
                                type="number"
                                name='seconds'
                                value={values.seconds}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='h-12 w-full bg-foreground text-copy-lighter border-2 rounded-lg border-border border-opacity-50 focus:border-border focus:text-copy transition duration-200 outline-none px-6 text-md' />

                            {errors.seconds && <span className='text-error-content'>{errors.seconds}</span>}
                        </label>
                        <label className='relative w-full px-5 py-2'>
                            <span className='text-copy text-sm text-opacity-80'>
                                Increment (sec)
                            </span>
                            <input
                                type="number"
                                name='increment'
                                value={values.increment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='h-12 w-full bg-foreground text-copy-lighter border-2 rounded-lg border-border border-opacity-50 focus:border-border focus:text-copy transition duration-200 outline-none px-6 text-md' />

                            {errors.increment && <span className='text-error-content'>{errors.increment}</span>}
                        </label>
                    </div>
                    <div className='mt-4 font-semibold text-lg'>
                        <span>{`${values.hours} : ${values.minutes} : ${values.seconds} | ${values.increment}`} </span>
                    </div>
                    <button type='submit' className='bg-primary-light rounded-full w-3/5 px-3 py-3 mt-6 font-semibold text-copy text-xl'>
                        <span className='flex flex-row items-center justify-center gap-2'>
                            <TbChess size={24} />
                            Play
                        </span>
                    </button>
                </form>
                <div className='flex flex-col items-center justify-center w-full'>
                    <span className='font-semibold text-xl m-5'>vs</span>
                    <SimpleMenu item={item} setItem={setItem} />
                </div>
            </div>
        </>
    )
}

export default TimeControls