import { useEffect, useState } from "react";
import { Deck, Discard, Player } from "../utils/une.js";
import Player1 from "./Player1.jsx";
import Player2 from "./Player2.jsx";
import PilesArea from "./PilesArea.jsx";
import CallUnoButton from "./CallUnoButton.jsx";
import QuitButton from "./QuitButton.jsx";
import { socket } from "../socket.js";


export default function Game() {
  const [playingDeck, setPlayingDeck] = useState(new Deck());
  const [playingDiscardPile, setPlayingDiscardPile] = useState(new Discard());
  const [playerOne, setPlayerOne] = useState(new Player("Player 1"));
  const [playerTwo, setPlayerTwo] = useState(new Player("Player 2"));

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isGameOn, setIsGameOn] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false) 
  socket.off("buttonPressedFromServer")
  
  function socketTest (){
  socket.emit("buttonPressed", buttonPressed);
}

  socket.on("buttonPressedFromServer", (response) => {
    setButtonPressed(!response)
})

socket.on("cardDrawnFromServer", (response) => {
  console.log(response, "THE RESPONSE")
  console.log(response.newDeck, "changed deck in game")
  setPlayingDeck(response.newDeck)
  setPlayerOne(response.newP1);
  setPlayerTwo(response.newP2);
})

socket.on("playCardFromServer", (response) => {
  console.log(response, "playCardFromServer")
  setCurrentPlayer(response.newCurrentPlayer);
  setPlayingDiscardPile(response.newDiscardPile);
})

socket.on("playerOnePlayCardFromServer", (response) => {
  console.log(response, "playerOnePlayCardFromServer")
  setPlayerOne(response);
})

socket.on("playerTwoPlayCardFromServer", (response) => {
  console.log(response, "playerTwoPlayCardFromServer")
  setPlayerTwo(response);
})

socket.on("gameStartFromServer", (response)=> {
  setPlayingDeck(response.deck);
  setPlayingDiscardPile(response.discard);
  setPlayerOne(response.makeP1);
  setPlayerTwo(response.makeP2);
  setIsGameOn(response.gameOn);
})

  const hasValidMove = (playerHand) => {
    if (!playingDiscardPile.discardPile.length) return false;
    const topCard = playingDiscardPile.discardPile[playingDiscardPile.discardPile.length - 1];
    return playerHand.some(card => 
      card.cardColour === topCard.cardColour || 
      card.cardNumber === topCard.cardNumber
    );
  };

  const handleGameStart = () => {
    if (isGameOn) return;  
    const newDeck = new Deck();
    const newDiscardPile = new Discard();
    const newPlayerOne = new Player("Player 1");
    const newPlayerTwo = new Player("Player 2");
    const totalPlayers = [newPlayerOne, newPlayerTwo];
    
    newDeck.startGame(totalPlayers, newDiscardPile.discardPile);

    socket.emit("gameStart", {deck: newDeck, discard: newDiscardPile, makeP1: newPlayerOne, makeP2: newPlayerTwo, gameOn: true})


  };

  const handleDrawCard = (playerNumber) => {
    if (playerNumber === currentPlayer) {
      const updatedDeck = new Deck();
      updatedDeck.deckPile = [...playingDeck.deckPile];
      
      if (playerNumber === 1) {
        updatedDeck.drawCards(1, playerOne.hand);
      } else {
        updatedDeck.drawCards(1, playerTwo.hand);
      }
      const currentHand = playerNumber === 1 ? playerOne.hand : playerTwo.hand;
      if (!hasValidMove(currentHand)) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
      socket.emit("cardDrawn", {newDeck: updatedDeck, newP1: { ...playerOne, hand: [...playerOne.hand] }, newP2: { ...playerTwo, hand: [...playerTwo.hand] }});
    }
  };

  const handlePlayCard = (playerNumber, cardIndex) => {
    console.log("HANDLE PLAY CARD")
    if (playerNumber === currentPlayer) {
      if (playerNumber === 1) {
        const updatedPlayerOne = new Player(playerOne.username);
        updatedPlayerOne.hand = [...playerOne.hand];
        updatedPlayerOne.playCard(cardIndex, playingDiscardPile.discardPile);
          socket.emit("playerOnePlayCard", updatedPlayerOne)
      } else {
        const updatedPlayerTwo = new Player(playerTwo.username);
        updatedPlayerTwo.hand = [...playerTwo.hand];
        updatedPlayerTwo.playCard(cardIndex, playingDiscardPile.discardPile);
          socket.emit("playerTwoPlayCard", updatedPlayerTwo)
      }

      socket.emit("playCard", {newCurrentPlayer: currentPlayer === 1 ? 2 : 1, newDiscardPile: { ...playingDiscardPile }});
    }
  };

  return (
    <div className="position-relative vh-100 bg-success overflow-hidden">
      <QuitButton socketTest = {socketTest} buttonPressed = {buttonPressed} />
    
      <div className="position-relative w-100 h-100 bg-success-subtle">
        <Player1
          hand={playerOne.hand}
          isCurrentPlayer={currentPlayer === 1}
          onPlayCard={(cardIndex) => handlePlayCard(1, cardIndex)}
          discardPile={playingDiscardPile.discardPile}
          hasValidMove={hasValidMove(playerOne.hand)}
        />
        <Player2
          hand={playerTwo.hand}
          isCurrentPlayer={currentPlayer === 2}
          onPlayCard={(cardIndex) => handlePlayCard(2, cardIndex)}
          discardPile={playingDiscardPile.discardPile}
          hasValidMove={hasValidMove(playerTwo.hand)}
        />
        <PilesArea
          deck={playingDeck}
          discardPile={playingDiscardPile.discardPile}
          currentPlayer={currentPlayer}
          onDrawCard={handleDrawCard}
          hasValidMove={currentPlayer === 1 ? 
            hasValidMove(playerOne.hand) : 
            hasValidMove(playerTwo.hand)}
        />
      </div>
      <CallUnoButton 
        onClick={handleGameStart}
        disabled={isGameOn}
      />
    </div>
  );
}