export default function CallUnoButton({ onClick, disabled }) {
  return (
      <button 
      className="btn btn-primary position-absolute bottom-0 end-0 m-3" 
      style={{zIndex:1000, width: '200px', height: '200px'}}
      onClick={onClick}
      disabled={disabled}
      >
        {disabled ? "Game In Progress" : "Start Game"}
      </button> 
  )
}
