import { useNavigate } from 'react-router-dom';

function Navbar() {
    let navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
    }
    const handleSignup = () => {
        navigate('/signup')
    }
    return (
        <div className='fixed top-0 w-full'>
            <div className='flex text-copy items-center justify-between'>
                <div className='flex flex-row items-center'>
                    <div className="w-16 h-16">
                        <img src="images/logo.png" alt="Logo" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">PawnHub.com</div>
                    </div>
                </div>
                <div className='flex flex-row-reverse p-3 gap-4'>
                    <div>
                        <button onClick={handleLogin} className="text-copy font-semibold py-2 px-4 rounded-full border-2 border-primary">Login</button>
                    </div>
                    <div>
                        <button onClick={handleSignup} className="bg-gradient-to-r from-primary-content to-primary text-copy font-semibold py-2 px-4 rounded-full">Signup</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Navbar