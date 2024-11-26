export default function Player4() {
    /* Right Player */
  return (
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
  )
}
