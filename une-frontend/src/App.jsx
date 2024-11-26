import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Game from './pages/Game';

//socket.io components:
import {socket} from "./socket.js"

import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';

import CreateGamePage from './components/CreateGamePage'
import GameRoomPlaceHolder from './components/GameRoomPlaceHolder'

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

  return (
  <>
    <Routes>
    <Route path="/" element={<Game />} />
    <Route path="/gameroom/:room_id" element={<GameRoomPlaceHolder/>}/>
    </Routes>
      <div className = "App">
         <ConnectionState isConnected={ isConnected } />
          <ConnectionManager />
      </div>
  </>
  )
}