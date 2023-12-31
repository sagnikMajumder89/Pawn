import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AuthRoute({ children }) {
    const [loading, setLoading] = useState(true)
    const [userDetails, setUserDetails] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/checkauth`, { withCredentials: true })
            .then(res => {
                setUserDetails(res.data.user)
                setLoading(false)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/login')
                } else {
                    console.log(err)
                }
            })
    }, [navigate])

    if (loading)
        return (
            <div className='flex flex-col bg-background items-center justify-center w-full h-full'>
                <span className='text-4xl font-semibold text-copy'>Loading...</span>
            </div>
        )

    return React.Children.map(children, child => {
        return React.cloneElement(child, {
            userDetails
        });
    });
}

export default AuthRoute