

import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import MiniDrawer from "./Minidrawer";
import { useContext } from "react";
import { UserDetailsContext } from "../Authentication/AuthRoute";

const cardItems = {
    'Play Blitz': {
        title: 'Play Blitz',
        subtitle: 'Play a quick game of chess',
        image: 'images/chessplay.png',
        link: '/play'
    },
    'Play with Friends': {
        title: 'Play with Friends',
        subtitle: 'Play a game of chess with your friends',
        image: 'images/chesswf.png',
        link: '/playwf'
    },
    'Practice with Bots': {
        title: 'Practice with Bots',
        subtitle: 'Practice your chess skills with bots',
        image: 'images/chesswb.png',
        link: '/playwb'
    },

    'Watch Live Games': {
        title: 'Watch Live Games',
        subtitle: 'Watch the best players play live',
        image: 'images/live.png',
        link: '/watch'
    }

}

function Home() {
    const { userDetails } = useContext(UserDetailsContext);
    const navigator = useNavigate();
    const handleClick = (link) => {
        navigator(link);
    }
    return (
        <div className='bg-background w-full h-full flex flex-row'>
            <MiniDrawer />
            <div className="flex flex-col items-start justify-start w-full px-20 py-28 gap-2">
                <span className="text-3xl font-semibold">{`Welcome ${userDetails.username} !`}</span>
                <span className="text-xl font-light">Get going with your games</span>
                <div className="grid grid-cols-4">
                    {Object.keys(cardItems).map((key) => {
                        return (
                            <div key={key} onClick={() => handleClick(cardItems[key].link)}>
                                <Cards title={cardItems[key].title} subtitle={cardItems[key].subtitle} image={cardItems[key].image} />
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col gap-2 mt-4 w-full">
                    <span className="text-3xl font-semibold">Game History</span>
                    {userDetails.gameHistory.length === 0 ? <span className="text-md font-light">No games played yet</span> :
                        <div className="flex flex-col gap-2 w-full">
                            {userDetails.gameHistory.map((game) => {
                                return (
                                    <div key={game._id} className="flex flex-col gap-2 bg-foreground w-full p-2 border-border border-2">
                                        <span className="text-sm text-gray-400 px-5">Game id: {game._id}</span>
                                        <div className="flex flex-row gap-4 font-semibold items-center justify-start px-5 pb-3 w-full ">
                                            <span>
                                                White: {game.white.username}
                                            </span>
                                            <span>
                                                {game.white.rating}
                                            </span>
                                        </div>
                                        <div className="flex flex-row gap-4 font-semibold items-center justify-start px-5 pb-3 w-full">
                                            <span>
                                                Black: {game.black.username}
                                            </span>
                                            <span>
                                                {game.white.rating}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home