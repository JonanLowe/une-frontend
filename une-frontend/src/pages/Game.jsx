import { useEffect, useState } from "react";
import { Deck, Discard, Player } from "../utils/une.js";
 
const playingDeck= new Deck
const PlayerOne= new Player("Player 1")
const playingDiscardPile= new Discard()
playingDeck.shuffle()
console.log(playingDeck.deckPile)
console.log(PlayerOne)

export default function Game() {
  const [deck, setDeck]= useState(playingDeck.deckPile)
  const [p1Hand, setP1Hand]= useState(PlayerOne.hand)

  useEffect(()=>{
    deckButton.addEventListener("click", ()=>{
      playingDeck.drawCards(1, PlayerOne.hand)
      setP1Hand(PlayerOne.hand)
      console.log(p1Hand, "STATE")
    })
  }, [PlayerOne.hand, p1Hand])
  return (
    <div className="position-relative vh-100 bg-success overflow-hidden">
      {/* Quit button */}
      <button className="btn btn-outline-danger position-absolute top-0 start-0 m-3" style={{zIndex:1000}}>
        Quit
      </button>

      <div className="position-relative w-100 h-100 bg-success-subtle">
        {/* Top Player */}
        <div className="position-absolute top-0 start-50 translate-middle-x bg-light p-3 rounded w-50 text-center">
          <div className="fw-bold mb-2">Player 3</div>
          <div className="d-flex justify-content-center gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-secondary rounded shadow-sm"
                style={{ width: '100px', height: '150px' }}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Player */}
        <div
          className="position-absolute top-50 end-0 translate-middle-y bg-light p-3 rounded w-0 text-center"
          style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
        >
          <div className="fw-bold mb-2">Player 4</div>
          <div className="d-flex flex gap-2 mx-auto" style={{ width: 'fit-content' }}>
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="bg- border border-secondary rounded shadow-sm"
                style={{ width: '120px', height: '70px' }}
              ></div>
            ))}
          </div>
        </div>

        {/* Left Player */}
        <div
          className="position-absolute top-50 start-0 translate-middle-y bg-light p-3 rounded w-0 text-center"
          style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
        >
          <div className="fw-bold mb-2">Player 2</div>
          <div className="d-flex flex gap-2 mx-auto" style={{ width: 'fit-content' }}>
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-secondary rounded shadow-sm"
                style={{ width: '120px', height: '70px' }}
              ></div>
            ))}
          </div>
        </div>

        {/* Bottom Player */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x bg-success p-3 rounded w-50 text-center">
          <div className="fw-bold mb-2">Player 1</div>
          <div className="d-flex justify-content-center gap-2">
            {p1Hand.map((_, i) => (
              <div
                key={i}
                className="bg-white border border-secondary rounded shadow-sm"
                style={{ width: '100px', height: '150px' }}
              ></div>
            ))}
          </div>
          <p>AHHHH: {p1Hand}</p>
        </div>

        {/* Deck area*/}
        <div className="position-absolute top-50 start-50 translate-middle bg-warning p-3 rounded d-flex gap-3">
          <button
            className="bg-white border border-success rounded shadow d-flex align-items-center justify-content-center text-center"
            style={{ width: '120px', height: '200px' }}
            id="deckButton"
            //onClick={playingDeck.drawCards(1, PlayerOne.hand)}
          >
            Draw Cards
          </button>
          <div
            className="bg-white border border-success rounded shadow d-flex align-items-center justify-content-center text-center"
            style={{ width: '120px', height: '200px' }}
          >
            Played Cards
          </div>
        </div>
      </div>
      
      {/* Call UNO button */}
      <button className="btn btn-primary position-absolute bottom-0 end-0 m-3" style={{zIndex:1000, width: '200px', height: '200px'}}>
        Call UNO !
      </button>
    </div>
  );
}