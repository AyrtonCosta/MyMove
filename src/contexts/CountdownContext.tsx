import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    IsActive: boolean;
    startCountdown: () => void;
    resetCoundown: () => void;

}

interface CountdownProviderProps{
    children:ReactNode;
}

 export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout : NodeJS.Timeout;


export function CountdownProvider({children} : CountdownProviderProps ){
    
    const {startNewChallenge} = useContext(ChallengesContext);

    const [ time,setTime ] = useState(30 * 60);
    const [IsActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(){
        setIsActive(true);
    }

    function resetCoundown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60)
    }

    useEffect(() => {
        if(IsActive && time >0){
            countdownTimeout =  setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if(IsActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [IsActive, time])



    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            IsActive,
            startCountdown,
            resetCoundown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}