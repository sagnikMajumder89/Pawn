import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialCount, pause }) => {
    const [seconds, setSeconds] = useState(initialCount);

    useEffect(() => {
        let timerId;
        if (seconds > 0 && !pause) {
            timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
        }

        return () => clearTimeout(timerId);
    }, [seconds, pause]); // Add pause to the dependency array

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = Math.floor(totalSeconds % 60);
        return `${hours > 0 ? `${hours}:` : ''}${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-copy text-2xl font-bold bg-foreground px-5 py-1 tracking-widest">
            {formatTime(seconds)}
        </div>
    );
};

export default CountdownTimer;

