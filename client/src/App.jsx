import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './views/Home'

function App() {
  const [player, setPlayer] = useState ([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home player={player} setPlayer={setPlayer}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
