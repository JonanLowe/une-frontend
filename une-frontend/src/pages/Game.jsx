import { useEffect, useState } from "react";
import { Deck, Discard, Player } from "../utils/une.js";
import Player1 from "./Player1.jsx";
import Player2 from "./Player2.jsx";
import Player3 from "./Player3.jsx";
import Player4 from "./Player4.jsx";
import DeckArea from "./DeckArea.jsx";
import DiscardArea from "./DiscardArea.jsx";
import PilesArea from "./PilesArea.jsx";
import CallUnoButton from "./CallUnoButton.jsx";
import QuitButton from "./QuitButton.jsx";
 
const playingDeck= new Deck
const PlayerOne= new Player("Player 1")
const PlayerTwo= new Player("Player 2")
const totalPlayers = []

const playingDiscardPile= new Discard()
playingDeck.shuffle()
console.log(playingDeck.deckPile)
console.log(PlayerOne, PlayerOne)
console.log(totalPlayers, "totalPlayers")

import { socket } from "../socket.js";

export default function Game() {
  const [deck, setDeck]= useState(playingDeck.deckPile)
  const [p1Hand, setP1Hand]= useState(PlayerOne.hand)
  const [buttonPressed, setButtonPressed] = useState(false)
  socket.off("buttonPressedFromServer")

function socketTest (){
  console.log("button pressed by ", socket.id)
  socket.emit("buttonPressed", buttonPressed);
}

socket.on("buttonPressedFromServer", (response) => {
  setButtonPressed(!response)
})


  return (
    <div className="position-relative vh-100 bg-success overflow-hidden">
      <QuitButton socketTest = {socketTest} buttonPressed = {buttonPressed}/>
      
      <div className="position-relative w-100 h-100 bg-success-subtle">
        <Player1 />
        <Player2 />
        <PilesArea />
      </div>

      <CallUnoButton />
    </div>
  );
}