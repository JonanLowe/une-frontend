import './App.css'
import { Route, Routes } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import GamePage from './components/GamePage'
import GameOverPage from './components/GameOverPage'

function App() {

  return (
    <>
      <h1>UNO placeholder</h1>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/Game" element={<GamePage/>}/>
        <Route path="/GameOver" element={<GameOverPage/>}/>
      </Routes>
    </>
  )
}

export default App
