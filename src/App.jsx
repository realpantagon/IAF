import { Routes, Route } from "react-router-dom";
import Scanin from "./Scanin";
import Scanout from "./Scanout";
import Dashboard from "./Dashboard";
import Dashboard2 from "./Dashboard2";
import Scanin2 from "./Scanin2";
import Scanout2 from "./Scanout2";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/2" element={<Dashboard2 />} />
        <Route path="/Scanin" element={<Scanin />} />
        <Route path="/Scanout" element={<Scanout />} />
        <Route path="/Scanin2" element={<Scanin2 />} />
        <Route path="/Scanout2" element={<Scanout2 />} />
      </Routes>
    </div>
  );
}

export default App;