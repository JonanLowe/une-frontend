import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react';


//socket.io components:
import {socket} from "./socket.js"

import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';

import WelcomePage from './components/WelcomePage.jsx'
import Game from './pages/Game';
import GameOver from './components/GameOver.jsx'

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  console.log(isConnected, "isConnected")

  useEffect(() => {
    function onConnect() {
      console.log("connection")
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnection")
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

    };
  }, []);

  /*
  Routes: / welcome page - 'play' button links to game
          / game for game page
  */

  return (
  <>
    <Routes>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/game/" element={<Game/>}/>
    <Route path="/gameOver/" element={<GameOver/>}/>
    </Routes>
      <div className = "App">
         <ConnectionState isConnected={ isConnected } />
          <ConnectionManager />
      </div>
  </>
  )
}