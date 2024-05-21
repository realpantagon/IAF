import { Routes, Route } from "react-router-dom";
import Scanin from "./Scanin";
import Scanout from "./Scanout";
import Dashboard from "./Dashboard";
import Dashboard2 from "./Dashboard2";
import Scanin2 from "./Scanin2";
import Scanout2 from "./Scanout2";
import Scaninmain2 from "./Scaninmain2";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="Pitching" element={<Dashboard2 />} />
        <Route path="Scaninmain" element={<Scanin />} />
        <Route path="Scanoutmain" element={<Scanout />} />
        <Route path="Scaninpitch" element={<Scanin2 />} />
        <Route path="Scanoutpitch" element={<Scanout2 />} />
        <Route path="Scaninmain2" element={<Scaninmain2 />} />
      </Routes>
    </div>
  );
}

export default App;