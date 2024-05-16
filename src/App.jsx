import { Routes, Route } from "react-router-dom"
import Scanin from "./Scanin"
import Scanout from "./Scanout"
import Dashboard from "./Dashboard"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Dashboard/> } />
        <Route path="Scanin" element={ <Scanin/> } />
        <Route path="Scanout" element={ <Scanout/>} />
      </Routes>
    </div>
  )
}

export default App