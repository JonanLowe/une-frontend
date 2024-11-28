import CardBackUne from '../assets/cards-back/CardBackUne.png'

export default function Player2Dummy({ hand, isCurrentPlayer, onPlayCard, discardPile, hasValidMove }) {
  const getCardStyle = (card) => {
    const colorMap = {
      'purple': '#800080',
      'orange': '#FFA500',
      'pink': '#FFC0CB',
      'black': '#000000'
    };

    // Get the top card once for comparison
    const topCard = discardPile && discardPile.length > 0 ? 
      discardPile[discardPile.length - 1] : null;
    
    // Check if this specific card is valid
    const isThisCardValid = topCard ? 
      (card.cardColour === topCard.cardColour || card.cardNumber === topCard.cardNumber) : 
      false;

    return {
      width: '100px',
      height: '150px',
      backgroundImage: `url(${CardBackUne})`,
      backgroundSize: '100% 100%',
      backgroundColor: 'red',
      color: card.cardColour === 'black' ? 'white' : 'black',
      opacity:  1
    };
  };

  return (
    <div className="position-absolute top-0 start-50 translate-middle-x bg-success p-3 rounded w-50 text-center">
      <div className="d-flex justify-content-center gap-2">
        {hand.map((card, i) => (
          <div
            key={i}
            className="bg-black border border-secondary rounded shadow-sm d-flex flex-column justify-content-between p-2"
            style={getCardStyle(card)}
            // onClick={() => isCurrentPlayer && onPlayCard(i)}
          >
            {/* <div className="text-start">{card.cardNumber}</div>
            <div className="fs-1 fw-bold">{card.cardNumber}</div>
            <div className="text-start" style={{ transform: 'rotate(180deg)' }}>
              {card.cardNumber}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}