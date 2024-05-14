import { Routes, Route } from "react-router-dom"
import HallSeats from "./HallSeats"
import Scanin from "./Scanin"
import Scanout from "./Scanout"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HallSeats/> } />
        <Route path="Scanin" element={ <Scanin/> } />
        <Route path="Scanout" element={ <Scanout/>} />
      </Routes>
    </div>
  )
}

export default App