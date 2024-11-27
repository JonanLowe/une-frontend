import {Link} from "react-router-dom"

export default function GameOver(){    

    return    (   
      <div className="position-absolute top-50 start-50 translate-middle bg-warning p-3 rounded d-flex gap-3">

       <h1>GAME OVER!</h1>
       <Link to={'/'}>
         <button id="return-home" onClick={() => {}}> Go Home! </button>
      </Link>
    </div>
   )
   }