export default function DeckArea({ deck, currentPlayer, onDrawCard, hasValidMove }) {
  return (
    <button
      className={`bg-white border rounded shadow d-flex align-items-center justify-content-center text-center 
        ${!hasValidMove ? 'border-warning border-3' : 'border-success'}`}
      style={{ 
        width: '120px', 
        height: '200px',
        cursor: !hasValidMove ? 'pointer' : 'default'
      }}
      onClick={() => !hasValidMove && onDrawCard(currentPlayer)}
      disabled={hasValidMove}
      id="deckButton"
    >
      <div className="d-flex flex-column align-items-center">
        Draw Cards ({deck.deckPile.length})
        {!hasValidMove && <div className="text-warning mt-2">{`PLayer ${currentPlayer} Must Draw!`}</div>}
      </div>
    </button>
  );
}