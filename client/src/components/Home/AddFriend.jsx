
import Lottie from "lottie-react";
import MiniDrawer from "./Minidrawer";
import { useState } from "react";
import axios from "axios";
import FriendTitle from "./FriendTitle";
const friendshipChessQuotes = [
    "In the game of chess and life, a true friend is like a faithful bishop, moving diagonally to protect you, staying close, and always valuing the depth of the board.",
    "Friendship is like a game of chess: with each move, you learn more about each other, plan your future moves together, and protect one another against the adversities of life.",
    "Much like in chess, a friend is someone who sees your board from a different perspective, guides you through complex moves, and stands by you till the end of the game.",
    "In life's chessboard, friends are the knights who leap over obstacles, defending and supporting you in unexpected and invaluable ways.",
    "True friendship is like playing a good game of chess – it requires patience, strategy, and respecting each other's moves, no matter the outcome of the game.",
    "The bond of friendship is much like a game of chess – it requires two players who equally understand the importance of every move and the value of every piece on the board.",
    "A friend in life is like a pawn in chess: their journey may seem straightforward, but their presence is crucial, and their potential to become something greater is always there.",
    "Just as a chess game is incomplete without all its pieces, life is incomplete without friends who add different dimensions to our journey, each with their unique role and significance.",
    "In the intricate chess game of life, a good friend is like a strategic queen move – powerful, decisive, and always there when you need them the most.",
    "Chess teaches us that every piece has its unique role, just as every friend in our life plays an irreplaceable role, making our journey complete and meaningful."
];
const randomIdx = Math.floor(Math.random() * friendshipChessQuotes.length);

function Home(props) {
    const [friends, setFriends] = useState([])
    const handleSearch = async (event) => {
        if (event.target.value.length < 3) {
            setFriends([])
            return
        }

        try {
            const search = event.target.value.trim();
            if (search !== null || search !== '' || search !== undefined || search.length >= 3) {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/searchByUsername`, { username: search }, { withCredentials: true })
                setFriends(response.data)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='bg-background w-full h-full flex flex-row'>
            <MiniDrawer />
            <div className="flex flex-col items-start justify-start w-full px-20 py-28 gap-2">
                <span className="text-3xl font-semibold">Add Friends</span>
                <div className="flex flex-col w-full items-center justify-center m-5">
                    <input
                        type="text"
                        placeholder='Search by username'
                        maxLength={20}
                        onChange={handleSearch}
                        className='w-3/5 h-12 bg-foreground text-copy-lighter border-2 rounded-lg border-border border-opacity-50 focus:border-border focus:text-copy transition duration-200 outline-none px-6 text-md'
                    />
                </div>
                <div className="flex flex-col w-full items-center justify-center m-5">
                    {friends.map(friend => {
                        return (
                            <FriendTitle friend={friend} />
                        )
                    }
                    )}
                </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full px-20 py-28 gap-2">
                <Lottie animationData={require('../../utils/friends.json')} />
                <span className="font-quote text-xl text-center">{friendshipChessQuotes[randomIdx]}</span>
            </div>
        </div>
    )
}

export default Home