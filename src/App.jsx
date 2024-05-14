import { Routes, Route } from "react-router-dom"
import HallSeats from "./HallSeats"
import Scanin from "./Scanin"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HallSeats/> } />
        <Route path="Scanin" element={ <Scanin/> } />

      </Routes>
    </div>
  )
}

export default App