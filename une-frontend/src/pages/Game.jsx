import { useEffect, useState } from "react";
import { Deck, Discard, Player } from "../utils/une.js";
import Player1 from "./Player1.jsx";
import Player2 from "./Player2.jsx";
import PilesArea from "./PilesArea.jsx";
import CallUnoButton from "./CallUnoButton.jsx";
import QuitButton from "./QuitButton.jsx";
 

export default function Game() {
  const [playingDeck, setPlayingDeck] = useState(new Deck());
  const [playingDiscardPile, setPlayingDiscardPile] = useState(new Discard());
  const [playerOne, setPlayerOne] = useState(new Player("Player 1"));
  const [playerTwo, setPlayerTwo] = useState(new Player("Player 2"));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isGameOn, setIsGameOn] = useState(false);

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
    
    setPlayingDeck(newDeck);
    setPlayingDiscardPile(newDiscardPile);
    setPlayerOne(newPlayerOne);
    setPlayerTwo(newPlayerTwo);
    setIsGameOn(true);
  };

  const handleDrawCard = (playerNumber) => {
    if (playerNumber === currentPlayer) {
      const updatedDeck = new Deck();
      updatedDeck.deckPile = [...playingDeck.deckPile];
      
      if (playerNumber === 1) {
        updatedDeck.drawCards(1, playerOne.hand);
        setPlayerOne({ ...playerOne, hand: [...playerOne.hand] });
      } else {
        updatedDeck.drawCards(1, playerTwo.hand);
        setPlayerTwo({ ...playerTwo, hand: [...playerTwo.hand] });
      }
      setPlayingDeck(updatedDeck);
      // Switch turns after drawing if no valid moves
      const currentHand = playerNumber === 1 ? playerOne.hand : playerTwo.hand;
      if (!hasValidMove(currentHand)) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    }
  };

  const handlePlayCard = (playerNumber, cardIndex) => {
    if (playerNumber === currentPlayer) {
      if (playerNumber === 1) {
        const updatedPlayerOne = new Player(playerOne.username);
        updatedPlayerOne.hand = [...playerOne.hand];
        updatedPlayerOne.playCard(cardIndex, playingDiscardPile.discardPile);
        setPlayerOne(updatedPlayerOne);
      } else {
        const updatedPlayerTwo = new Player(playerTwo.username);
        updatedPlayerTwo.hand = [...playerTwo.hand];
        updatedPlayerTwo.playCard(cardIndex, playingDiscardPile.discardPile);
        setPlayerTwo(updatedPlayerTwo);
      }
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setPlayingDiscardPile({ ...playingDiscardPile });
    }
  };

  return (
    <div className="position-relative vh-100 bg-success overflow-hidden">
      <QuitButton />
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