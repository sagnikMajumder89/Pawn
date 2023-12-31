import { useFormik } from "formik";
import { signUpSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
const inittialValues = {
    username: '',
    email: '',
    password: ''
}

function Signup() {
    const navigate = useNavigate()
    const { values, handleBlur, handleChange, touched, handleSubmit, errors } = useFormik({
        initialValues: inittialValues,
        validationSchema: signUpSchema,
        onSubmit: values => handleSubmitClick(values)
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

    async function handleSubmitClick(values) {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/signup', {
                username: values.username,
                email: values.email,
                password: values.password
            });
            console.log(response)
            if (response.status === 201) {
                const responeLogin = await axios.post('http://localhost:8000/api/v1/users/login', {
                    username: values.username,
                    password: values.password
                }, { withCredentials: true })
                console.log(responeLogin)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-row h-full justify-around'>
                <div className='flex items-center justify-center bg-background w-7/12'>
                    <div className='flex flex-col justify-center items-center gap-4 w-full'>
                        <span className='text-copy text-3xl font-bold antialiased text-center'>
                            Create your account
                        </span>
                        <span className='text-copy text-md font-extralight antialiased'>
                            Create using social networks
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
                            <div className='flex flex-col mt-4 items-center justify-center w-full'>
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
                                <label className='relative w-1/2 mb-3'>
                                    <input
                                        type="text"
                                        name='email'
                                        value={values.email}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className='h-12 w-full bg-foreground text-copy-lighter border-2 rounded-lg border-border border-opacity-50 focus:border-border focus:text-copy transition duration-200 outline-none px-6 text-md' />
                                    <span className='text-copy text-opacity-80 absolute left-0 top-3 mx-4 px-2 transition duration-200 input-text'>
                                        Email
                                    </span>
                                    <div className='h-4 w-full my-1 flex items-center justify-end'>
                                        <div className='h-full w-fit'>
                                            {(errors.email && touched.email) && <span className='text-error-content'>{errors.email}</span>}
                                        </div>
                                    </div>
                                </label>
                                <label className='relative w-1/2 mb-3'>
                                    <input
                                        type="text"
                                        name='password'
                                        value={values.password}
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
                                <button type='submit' className='bg-primary-light rounded-full w-1/5 px-3 py-3 mt-3 font-semibold text-copy'>Sign Up</button>
                            </div>
                        </form>



                    </div>
                </div>
                <div className='flex flex-col items-center justify-center bg-background gap-4 p-5 text-center bg-no-repeat bg-cover bg-center w-4/12' style={{ backgroundImage: `url(${'images/chessboard.png'})`, backgroundBlendMode: 'multiply' }} aria-hidden='true'>
                    <span className='text-copy text-3xl font-bold antialiased shadow-2xl'>
                        Already have an account?
                    </span>
                    <span className='text-copy font-extralight antialiased max-w-prose shadow-2xl'>
                        Sign in to continue
                    </span>
                    <button onClick={() => navigate('/login')} className='bg-copy rounded-full min-w-40 mt-6 px-3 py-3 font-semibold shadow-2xl'>Sign In</button>
                </div>
                <div className='bg-background w-1/12'>

                </div>
            </div>
        </>
    )
}

export default Signup