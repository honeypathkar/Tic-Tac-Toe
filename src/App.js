import "./App.css";
import Box from "./components/Box";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div>
        <div className="my-5">
          <h1 className="heading">Tic Tac Toe</h1>
        </div>
        <Routes>
          <Route exact path="/Tic-Tac-Toe/" element={<Box />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
