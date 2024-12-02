import DeckArea from "./DeckArea";
import DiscardArea from "./DiscardArea";

export default function PilesArea({ deck, discardPile, currentPlayer, onDrawCard, hasValidMove }) {
  return (
    <div className="position-absolute top-50 start-50 translate-middle bg-warning p-3 rounded d-flex gap-3">
      <DeckArea
        deck={deck}
        currentPlayer={currentPlayer}
        onDrawCard={onDrawCard}
        hasValidMove={hasValidMove}
      />
      <DiscardArea discardPile={discardPile} />
    </div>
  );
}