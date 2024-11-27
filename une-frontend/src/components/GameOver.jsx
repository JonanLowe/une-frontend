import {Link} from "react-router-dom"

export default function GameOver(){    

    return    (   
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75">
      <div className="position-absolute top-50 start-50 translate-middle text-center">
      <div className="bg-warning p-4 rounded-4 shadow-lg" style={{ minWidth: '300px' }}>
        <h1 className="display-4 mb-4 fw-bold">GAME OVER!</h1>
        <Link to={'/'} className="text-decoration-none">
          <button 
            id="return-home" 
            className="btn btn-light shadow-sm fw-semibold"
            onClick={() => {}}
          >
            Go Home!
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
}