import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import CountdownTimer from './Countdown'
import ChatBox from './Chatbox'
import Username from './Username'
import Sidebar from './Sidebar'
import { Chess } from 'chess.js'
import CustomizedSnackbars from '../Snackbar/Snackbar'
import ResultDialog from './ResultDialog'
import { useSocket } from '../../providers/socketContext'
import { GameDataContext } from '../../providers/gameDataProvider'
import { UserDetailsContext } from '../Authentication/AuthRoute'

function Gameboard() {
    const socket = useSocket();
    const { roomId } = useParams();
    const { gameData } = useContext(GameDataContext);
    const { userDetails } = useContext(UserDetailsContext);
    const [game, setGame] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // new state for loading
    const [error, setError] = useState({ show: false, message: '', type: '' });
    const [gameOver, setGameOver] = useState(false);
    const [promotion, setPromotion] = useState({ show: false, ssquare: null, tsquare: null });

    const navigate = useNavigate();

    // useEffect to update game state when gameData changes
    useEffect(() => {
        if (gameData) {

            setGame(new Chess(gameData.fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
            setIsLoading(false); // Set loading to false as gameData is available
            if (gameData.over) setGameOver(true)
        }
    }, [gameData]);

    //onDrop function
    const onDrop = (sourceSquare, targetSquare, p, promotionPiece = 'q') => {
        try {
            const piece = game.get(sourceSquare);
            //see who's turn it is
            if (game.turn() !== gameData.color[0]) {
                setError({ show: true, message: 'Not your turn', type: 'error' })
                return false
            }

            //handle promotion
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

    //Promotion handler
    const handlePromotion = (piece) => {
        onDrop(promotion.ssquare, promotion.tsquare, 'p', piece);
    }


    //Handle opponent move
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
    }, [socket])


    //join room
    useEffect(() => {
        socket.emit('joinRoom', { roomId })
    }, [socket, roomId])

    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <div className='flex flex-row items-center justify-center bg-background w-full h-full'>
                <div className=' w-fit flex items-center justify-start h-full'>
                    <Sidebar />
                </div>
                <div className='flex flex-col items-end justify-between h-full w-fit py-16'>
                    <Username username={gameData.opponent.username}
                        rating={gameData.opponent.rating}
                        profilePic={gameData.opponent.profilePicture}
                    />
                    <Username username={userDetails.username}
                        rating={userDetails.rating}
                        profilePic={userDetails.profilePicture}
                    />

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
                            boardOrientation={gameData.color}
                            position={game.fen()}
                            customDarkSquareStyle={{ backgroundColor: '#08825e' }}
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