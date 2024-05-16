import { Routes, Route } from "react-router-dom"
import Scanin from "./Scanin"
import Scanout from "./Scanout"
import HallSeats from "./Hallseats"

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