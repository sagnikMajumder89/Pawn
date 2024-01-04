import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import CountdownTimer from './Countdown'
import ChatBox from './Chatbox'
import Username from './Username'
import Sidebar from './Sidebar'
import { Chess } from 'chess.js'
import io from 'socket.io-client'
import CustomizedSnackbars from '../Snackbar/Snackbar'
import ResultDialog from './ResultDialog'
const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function Gameboard({ userDetails }) {

    const { roomId } = useParams()
    const [game, setGame] = useState(new Chess())
    const [color, setColor] = useState('w')
    const [error, setError] = useState({ show: false, message: '', type: '' })
    const [gameOver, setGameOver] = useState(false)
    const [promotion, setPromotion] = useState({ show: false, ssquare: null, tsquare: null });
    const navigate = useNavigate();
    const onDrop = (sourceSquare, targetSquare, p, promotionPiece = 'q') => {
        try {
            const piece = game.get(sourceSquare);
            //see who's turn it is
            if (game.turn() !== color) {
                setError({ show: true, message: 'Not your turn', type: 'error' })
                return false
            }

            //handle promotion
            console.log(piece, sourceSquare, targetSquare)
            if (promotion.show) {
                setPromotion({ show: false, ssquare: null, tsquare: null })
            } else if (piece?.type === 'p' && ((piece.color === 'w' && targetSquare[1] === '8') || (piece.color === 'b' && targetSquare[1] === '1'))) {
                setPromotion({ show: true, ssquare: sourceSquare, tsquare: targetSquare });
                return false; // Prevent the move until promotion is selected
            }


            let move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: promotionPiece
            })

            // illegal move
            if (move === null) return false;
            socket.emit('move', { roomId, userId: userDetails._id, move: game.fen() })
            setGame(new Chess(game.fen()))
            if (game.isGameOver()) {
                setGameOver(true)
            }

        } catch (error) {
            setError({ show: true, message: error.message, type: 'error' })
        }

    }

    const handlePromotion = (piece) => {
        onDrop(promotion.ssquare, promotion.tsquare, 'p', piece);
    }

    const handleOpponentMove = (move) => {
        const newGame = new Chess(move)
        setGame(newGame)
        if (newGame.isCheckmate()) {
            setGameOver(true)
        }
    }

    //listen to move
    useEffect(() => {
        socket.on('move', (data) => {
            handleOpponentMove(data)
        })
    }, [])

    useEffect(() => {
        socket.on('join-room', (data) => {
            if (data.userId != userDetails._id) return;
            setColor(data.color)
        })
        socket.emit('join-room', { roomId, userId: userDetails._id })
    }, [])

    return (
        <>
            <div className='flex flex-row items-center justify-center bg-background w-full h-full'>
                <div className=' w-fit flex items-center justify-start h-full'>
                    <Sidebar />
                </div>
                <div className='flex flex-col items-end justify-between h-full w-fit py-16'>
                    <Username user={'User1'} />
                    <Username user={'User2'} />

                </div>
                <div className='flex flex-col items-center justify-center w-1/2 p-5 relative'>

                    {promotion.show && (
                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center' style={{ zIndex: 2 }}>
                            <div className='grid grid-row-4 border-4 border-border'>
                                <div onClick={() => handlePromotion('q')} className='bg-[#fef8e2] w-20'>
                                    <img src='/images/chess/qw.png' alt='Queen' />
                                </div>
                                <div onClick={() => handlePromotion('r')} className='bg-[#055205] w-20'>
                                    <img src='/images/chess/rw.png' alt='Rook' />
                                </div>
                                <div onClick={() => handlePromotion('b')} className='bg-[#fef8e2] w-20'>
                                    <img src='/images/chess/bw.png' alt='Bishop' />
                                </div>
                                <div onClick={() => handlePromotion('n')} className='bg-[#055205] w-20'>
                                    <img src='/images/chess/nw.png' alt='Knight' />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={promotion.show ? 'w-full h-full opacity-40' : 'w-full h-full'}>
                        <Chessboard
                            boardOrientation={color === 'w' ? 'white' : 'black'}
                            position={game.fen()}
                            // customDarkSquareStyle={{ backgroundColor: '#080222' }}
                            autoPromoteToQueen={true}
                            onPieceDrop={onDrop}
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-1/4'>
                    <div className='flex flex-col items-center justify-start'>
                        <span className='text-copy text-lg font-semibold'>
                            Timer
                        </span>
                        <CountdownTimer initialCount={600} />
                    </div>
                    <div className='flex flex-row items-center justify-evenly w-full gap-2'>
                        <button type='submit' className='bg-primary-light rounded-sm w-2/6 px-3 py-3 mt-6 font-semibold text-copy text-md'>
                            <span className='flex flex-row items-center justify-center gap-2'>
                                Draw
                            </span>
                        </button>
                        <button type='submit' className='bg-primary-light rounded-sm w-2/6 px-3 py-3 mt-6 font-semibold text-copy text-md'>
                            <span className='flex flex-row items-center justify-center gap-2'>
                                Resign
                            </span>
                        </button>
                    </div>
                    <div className='flex m-3 p-2'>
                        <ChatBox />
                    </div>
                </div>
            </div>
            {error.show && <CustomizedSnackbars open={error.show} type={error.type} message={error.message} handleClose={(event, reason) => {
                if (reason === 'clickaway') {
                    return;
                }
                setError({ open: false, type: '', message: '' });
            }} />}
            <ResultDialog open={gameOver} handleClose={() => {
                setGameOver(false)
                navigate('/home')
            }} />
        </>
    )
}

export default Gameboard