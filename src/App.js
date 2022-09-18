import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./Pages/register/Registration";
import NikahNama from "./Pages/NikahNama";
import Blockchain from "./Pages/NikahInfo/Blockchain";
import Search from "./Pages/NikahInfo/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NikahNama />} />
        <Route path="/register" element={<Navigate to="1" replace={true} />} />
        <Route path="/register/:level" element={<Registration />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
