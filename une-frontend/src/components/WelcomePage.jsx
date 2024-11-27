// import { useState } from "react"
// import { useSearchParams } from 'react-router-dom';
import {Link} from "react-router-dom"
import { useState } from "react";
// import socket stuff
import { socket } from '../socket';

export default function WelcomePage(){
 function handleCreateGame(){
   socket.connect()
   setIsCreating(true)
 }
 
 const [isCreating, setIsCreating] = useState(false);

 return (
   <div className="vh-100 bg-primary d-flex flex-column align-items-center justify-content-center">
     <section className="text-center mb-5">
       <h1 className="display-1 fw-bold text-white mb-4" 
           style={{ 
             fontFamily: "'Comic Sans MS', cursive",
             fontSize: '6rem',
             textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)'
           }}>
         Welcome to !Uno
       </h1>
     </section>

     <section>
       {/* This will be a button*/}
       {/* When clicked it will activate a socket.io connection and make a new socket.io room, returning its Id*/}
       {/* It will link to a gameroom and pass the socket room id to the gameroom*/}
       <Link to={'/game'} className="text-decoration-none">
         <button 
           id="create-game"
           className="btn btn-success btn-lg shadow-lg fw-bold"
           onClick={() => handleCreateGame()}
           style={{
             fontSize: '2rem',
             padding: '1rem 4rem',
             borderRadius: '2rem',
             backgroundColor: '#2ecc71',
             border: '3px solid #27ae60',
             transition: 'all 0.3s ease'
           }}
           onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
           onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
         >
           {isCreating ? (
             <>
               <p className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></p>
               Joining Game...
             </>
           ) : "PLAY!"}
         </button>
       </Link>
     </section>

     {/* <section>*/}
     {/* <h2>Show Available Games</h2> */}
     {/* button that returns available games on websocket*/}
     {/* games have a join button*/}
     {/* </section> */}
   </div>
 );
}