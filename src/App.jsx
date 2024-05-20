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
        <Route path="Pitching" element={<Dashboard2 />} />
        <Route path="ScaninMain" element={<Scanin />} />
        <Route path="ScanoutMain" element={<Scanout />} />
        <Route path="ScaninPitching" element={<Scanin2 />} />
        <Route path="ScanoutPitching" element={<Scanout2 />} />
      </Routes>
    </div>
  );
}

export default App;