import React, { useEffect, useState } from 'react'

const LiveTimer = ({ targetTime, }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    useEffect(() => {
        const currentTime = new Date().getTime();
        const targetDateTime = new Date(targetTime).getTime();
        // console.log(currentTime,targetDateTime)
        if (currentTime >= targetDateTime) {
            if (isRunning) {
                setIsRunning(false);
                // if (postId && isExpired == 'false' && napaTokenEarned == '') {
                //     updateMintPostStatus(
                //         postId,
                //         '1',
                //         amountEarned ? amountEarned : currentNapaPrice,
                //         tokenPrice,
                //     );
                // }
                // if (postId && napaTokenEarned == '') {
                //     updateMintPostStatus(
                //         postId,
                //         '1',
                //         amountEarned ? amountEarned : currentNapaPrice,
                //         tokenPrice,
                //     );
                // }
            }
        } else {
            if (isRunning) {
                const timerId = setInterval(() => {
                    const updatedTime = new Date().getTime();
                    const timeDifference = targetDateTime - updatedTime;
                    setRemainingTime(timeDifference);
                }, 1000);

                return () => {
                    clearInterval(timerId);
                };
            }
        }
    }, [remainingTime, isRunning]);
    // Convert remaining time to days, hours, minutes, and seconds
    const displaydays = Math.floor(remainingTime / 1000 / (24 * 60 * 60));
    const displayHours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const displayMinutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const displaySeconds = Math.floor((remainingTime / 1000) % 60);
    return (
        <div>{isRunning ? (
            <div style={{ color: 'white' }}>
                Live{displaydays} : 
                {displayHours < 10 ? `0$ {displayHours}` : displayHours || '00'} :
                {displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes || '00'}:
                {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds || '00'}
            </div>
        ) : (
            <div style={{ color: 'white' }}>Expired</div>
        )}</div>
    )
}

export default LiveTimer