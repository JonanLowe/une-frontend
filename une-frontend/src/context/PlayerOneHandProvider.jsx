import { createContext, useState } from "react";

export const playerOneHandContext=createContext()

const  PlayerOneHandProvider = ({children})=>{
    const [playerOneHand, setPlayerOneHand]= useState()

    return(
        <playerOneHandContext.Provider value={{playerOneHand, setPlayerOneHand}}>
            {children}
        </playerOneHandContext.Provider>
    )
}

export default PlayerOneHandProvider