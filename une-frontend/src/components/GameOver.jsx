import {Link} from "react-router-dom"

export default function GameOver(){    

    return    (   
        <>
       <h1>GAME OVER!</h1>
       <Link to={'/'}>
         <button id="return-home" onClick={() => {}}> Go Home! </button>
    </Link>
    
    </>
   )
   }