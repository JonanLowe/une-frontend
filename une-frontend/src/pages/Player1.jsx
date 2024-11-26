export default function Player1() {
    /* Bottom Player */
  return (
    <div className="position-absolute bottom-0 start-50 translate-middle-x bg-success p-3 rounded w-50 text-center">
    <div className="fw-bold mb-2">Player 1</div>
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
  )
}

