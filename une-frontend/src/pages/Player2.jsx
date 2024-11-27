export default function Player2({ hand, isCurrentPlayer, onPlayCard }) {
  /* Top Player */
  return (
        <div className="position-absolute top-0 start-50 translate-middle-x bg-light p-3 rounded w-50 text-center">
          <div className="fw-bold mb-2">Player 2</div>
          <div className="d-flex justify-content-center gap-2">
          {hand.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-secondary rounded shadow-sm"
              style={{ width: '100px', height: '150px', backgroundColor: card.cardColour, cursor: isCurrentPlayer ? 'pointer' : 'default' }}
          onClick={() => isCurrentPlayer && onPlayCard(i)}
        >
          <p>{card.cardNumber}</p>
          {card.cardColour}
        </div>
          ))}
    </div>
  </div>
  )
}