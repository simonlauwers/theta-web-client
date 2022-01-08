import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import useGame from "../../hooks/context-hooks/game/UseGame";
import usePhase from "../../hooks/context-hooks/game/UsePhase";
import usePlayer from "../../hooks/context-hooks/game/UsePlayer";
import useAuth from "../../hooks/context-hooks/UseAuth";

interface TimerProps {
    next: boolean;
    setNext : React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = (timerProps: TimerProps) => {
    const { maxTime} = useGame();
    const { currentPlayer } = usePlayer();
    const { user } = useAuth();
    const { phase } = usePhase();
    const [ time, setTime ] = useState<number>(0);
    
    useEffect(() => {
        const interval = setInterval(() => setTime(time => time + 0.1), 100);
        return () => {clearInterval(interval);};
    }, []);

    useEffect(() => {
        setTime(0);
    }, [phase]);
    
    useEffect(() => {
        if(currentPlayer?.user.uuid === user?.userId && time >= maxTime && !timerProps.next) {
            timerProps.setNext(true);
        }
    }, [time]);

    return (
        <div style={{position: "absolute", top: 0, right: 0, left: 0}}>
            <LinearProgress variant="determinate" value={time > maxTime? 100 : (time/maxTime) * 100} style={{height: "1vh"}}/>
        </div>
    );
};

export default Timer;
