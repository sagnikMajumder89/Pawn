import { useFormik } from 'formik'
import MiniDrawer from '../Home/Minidrawer'
import { Chessboard } from 'react-chessboard'
import TimeControls from './TimeControls'
import { useState } from 'react'
import FIndingGame from './FIndingGame'
import SelectFriend from './SelectFriend'


const initialValues = {
    hours: 0,
    minutes: 3,
    seconds: 0,
    increment: 2
}
function Play() {
    const [searchingGame, setSearchingGame] = useState(false)
    const [playVS, setplayVS] = useState('Random');
    const [opponentId, setOpponentId] = useState(null);
    const handleCancelClick = () => {
        setSearchingGame(false)
        setOpponentId(null)
    }
    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialValues,
        // validationSchema: signInSchema,
        onSubmit: values => {
            setSearchingGame(true)
            console.log(values)
        }
    })
    return (
        <div className='bg-background w-full h-full flex flex-row'>
            <MiniDrawer />
            <div className="flex flex-col items-center justify-center w-1/2 px-20 py-28">
                <div className='w-full border-2 border-copy'>
                    <Chessboard customDarkSquareStyle={{ backgroundColor: '#202d29' }} />
                </div>
            </div>
            <div className='flex flex-col w-1/2 items-center justify-center'>
                <div className='flex flex-col bg-foreground w-4/5 h-4/5 rounded-lg items-center p-5'>
                    {searchingGame ? ((playVS === 'Friend' && !opponentId) ? <SelectFriend setOpponentId={setOpponentId} /> : <FIndingGame toggle={handleCancelClick} />) : <TimeControls values={values} handleBlur={handleBlur} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} item={playVS} setItem={setplayVS} />}
                </div>
            </div>
        </div>
    )
}

export default Play