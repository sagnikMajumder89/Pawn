import React, { useState } from 'react'
import { Chessboard } from 'react-chessboard'
import CountdownTimer from './Countdown'
import ChatBox from './Chatbox'
import Username from './Username'
import Sidebar from './Sidebar'
import { Chess } from 'chess.js'

function Gameboard() {
    const [game, setGame] = useState(new Chess());
    const [promotion, setPromotion] = useState({ show: false, square: null });
    console.log(game)
    // const game = new Chess();
    // console.log(game)
    function onDrop(sourceSquare, targetSquare) {
        try {
            const piece = game.get(sourceSquare);

            // Check if it's a pawn reaching the last rank
            if (piece?.type === 'p' && ((piece.color === 'w' && targetSquare[1] === '8') || (piece.color === 'b' && targetSquare[1] === '1'))) {
                setPromotion({ show: true, square: targetSquare });
                return false; // Prevent the move until promotion is selected
            }
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "r" // Note: This example always promotes to a queen
            });

            console.log(game.fen())
            if (move === null) return false; // Illegal move
            const newGame = new Chess(game.fen());
            setGame(newGame);
            return true;
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='flex flex-row items-center justify-center bg-background w-full h-full'>
            <div className=' w-fit flex items-center justify-start h-full'>
                <Sidebar />
            </div>
            <div className='flex flex-col items-end justify-between h-full w-fit py-16'>
                <Username user={'User1'} />
                <Username user={'User2'} />

            </div>
            <div className='flex flex-col items-center justify-center w-1/2 p-5'>
                <Chessboard position={game.fen()} showPromotionDialog={false} onPieceDrop={onDrop} />
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
    )
}

export default Gameboard