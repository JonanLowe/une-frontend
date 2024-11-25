// import { useState } from "react"
// import { useSearchParams } from 'react-router-dom';
import {Link} from "react-router-dom"
import { useState } from "react";
// import socket stuff


export default function CreateGamePage(){


    function handleCreateGame(){
        setIsCreating(true)
        return 0;
    }

    const room_id = 0;

    const [isCreating, setIsCreating] = useState(false);



 return    (   
    <>

    <section>
    <h2>Welcome to !Uno</h2>
    </section>

    <section>
    
     {/* This will be a button*/}
     {/* When clicked it will activate a socket.io connection and make a new socket.io room, returning its Id*/}
     {/* It will link to a gameroom and pass the socket room id to the gameroom*/}

     
     <Link to={`/gameroom/${room_id}`}>
     <button id="create-game" onClick={() => {handleCreateGame}}> {isCreating? "Creating Game..." : "Create Game" }</button>
    </Link>
    
    </section>

    {/* <section>*/}
    {/* <h2>Show Available Games</h2> */}
     {/* button that returns available games on websocket*/}
     {/* games have a join button*/}
    {/* </section> */}
</>
)
}

