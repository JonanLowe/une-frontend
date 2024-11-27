export default function DiscardArea({ discardPile }) {
  const topCard = discardPile && discardPile.length > 0 ? 
    discardPile[discardPile.length - 1] : null;

  const getCardStyle = () => {
    const colorMap = {
      'purple': '#800080',
      'orange': '#FFA500',
      'pink': '#FFC0CB',
      'black': '#000000'
    };

    return {
      width: '120px',
      height: '200px',
      backgroundColor: topCard ? colorMap[topCard.cardColour] : 'white',
      color: topCard?.cardColour === 'black' ? 'white' : 'black'
    };
  };

  return (
    <div
      className="border border-success rounded shadow d-flex flex-column justify-content-between p-3"
      style={getCardStyle()}
    >
      {topCard ? (
        <>
          <div className="text-start">{topCard.cardNumber}</div>
          <div className="fs-1 fw-bold text-center">{topCard.cardNumber}</div>
          <div className="text-start" style={{ transform: 'rotate(180deg)' }}>
            {topCard.cardNumber}
          </div>
        </>
      ) : (
        <div className="text-center">No Card</div>
      )}
    </div>
  );
}