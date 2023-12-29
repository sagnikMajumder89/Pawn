import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialCount }) => {
    const [seconds, setSeconds] = useState(initialCount);

    useEffect(() => {
        if (seconds > 0) {
            const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [seconds]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hours > 0 ? `${hours}:` : ''}${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-copy text-2xl font-bold bg-foreground px-5 py-1 tracking-widest">
            {formatTime(seconds)}
        </div>
    );
};

export default CountdownTimer;
