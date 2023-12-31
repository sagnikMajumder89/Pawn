import { useFormik } from 'formik';
import { signInSchema } from '../../schemas';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const inittialValues = {
    username: '',
    password: ''
}

function Login() {
    const navigate = useNavigate()
    const handleLogin = ({ username, password }) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/login`, { username, password }, { withCredentials: true })
            .then(res => {
                navigate('/home')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const { values, handleBlur, touched, handleChange, handleSubmit, errors } = useFormik({
        initialValues: inittialValues,
        validationSchema: signInSchema,
        onSubmit: values => handleLogin(values)
    })

    function handleInputChange(event) {
        const input = event.target;
        const label = input.nextElementSibling;
        if (input.value.trim() !== '') {
            label.classList.add('has-value');
        } else {
            label.classList.remove('has-value');
        }
        handleChange(event)
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-row h-full justify-around'>
                <div className='flex items-center justify-center bg-background w-7/12'>
                    <div className='flex flex-col justify-center items-center gap-4 w-full'>
                        <span className='text-copy text-3xl font-bold antialiased text-center'>
                            Login to your account
                        </span>
                        <span className='text-copy text-md font-extralight antialiased'>
                            Login using social networks
                        </span>
                        <div className='flex flex-row gap-5'>
                            <div className='w-6 h-6'>
                                <button>
                                    <img src="images/google-icon.png" alt="google-icon" />
                                </button>
                            </div>
                            <div className='w-6 h-6'>
                                <button>
                                    <img src="images/x-icon.png" alt="x-icon" />
                                </button>
                            </div>
                            <div className='w-6 h-6'>
                                <button>
                                    <img src="images/github-icon.png" alt="github-icon" />
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-center w-3/5 gap-2'>
                            <div className='w-1/2 h-0 border-t border-white' />
                            <span className='text-copy'>or</span>
                            <div className='w-1/2 h-0 border-t border-white' />
                        </div>
                        <form onSubmit={handleSubmit} className='w-full'>
                            <div className='flex flex-col mt-4 items-center justify-center   w-full'>
                                <label className='relative w-1/2 mb-3'>
                                    <input
                                        type="text"
                                        name='username'
                                        value={values.username}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className='h-12 w-full bg-foreground text-copy-lighter border-2 rounded-lg border-border border-opacity-50 focus:border-border focus:text-copy transition duration-200 outline-none px-6 text-md' />
                                    <span className='text-copy text-opacity-80 absolute left-0 top-3 mx-4 px-2 transition duration-200 input-text'>
                                        Username
                                    </span>
                                    <div className='h-4 w-full my-1 flex items-center justify-end'>
                                        <div className='h-full w-fit'>
                                            {(errors.username && touched.username) && <span className='text-error-content'>{errors.username}</span>}
                                        </div>
                                    </div>
                                </label>
                                <label className='relative w-1/2'>
                                    <input
                                        type="password"
                                        name='password'
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className='h-12 w-full bg-foreground text-copy-lighter border-2 rounded-lg border-border border-opacity-50 focus:border-border focus:text-copy transition duration-200 outline-none px-6 text-md' />
                                    <span className='text-copy text-opacity-80 absolute left-0 top-3 mx-4 px-2 transition duration-200 input-text'>
                                        Password
                                    </span>
                                    <div className='h-4 w-full my-1 flex items-center justify-end'>
                                        <div className='h-full w-fit'>
                                            {(errors.password && touched.password) && <span className='text-error-content'>{errors.password}</span>}
                                        </div>
                                    </div>
                                </label>
                                <button type='submit' className='bg-primary-light rounded-full w-1/5 px-3 py-3 mt-3 font-semibold text-copy'>Sign In</button>
                            </div>
                        </form >



                    </div >
                </div >
                <div className='flex flex-col items-center justify-center bg-background gap-4 p-5 text-center bg-no-repeat bg-cover bg-center w-4/12' style={{ backgroundImage: `url(${'images/chessboard.png'})`, backgroundBlendMode: 'multiply' }} aria-hidden='true'>
                    <span className='text-copy text-3xl font-bold antialiased shadow-2xl'>
                        New here?
                    </span>
                    <span className='text-copy font-extralight antialiased max-w-prose shadow-2xl'>
                        Join the fray and let the games begin! Embark on an epic chess adventure where every move promises a thrilling experience.
                    </span>
                    <button onClick={() => navigate('/signup')} className='bg-copy rounded-full min-w-40 mt-6 px-3 py-3 font-semibold shadow-2xl'>Sign Up</button>
                </div>
                <div className='bg-background w-1/12'>

                </div>
            </div >
        </>
    )
}

export default Login