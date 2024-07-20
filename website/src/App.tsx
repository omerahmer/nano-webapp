// Import necessary components and libraries
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./components/Home";
import PeoplePage from "./components/People/PeoplePage";
import Biosensing from "./components/Biosensing/Biosensing";
import EBeam from "./components/EBeam/EBeam";
import EnergyStorage from "./components/Energy Storage/EnergyStorage";
import Login from "./components/Login/login";
import Biosensor from "./components/Biosensor/Biosensor";
import Register from "./components/Register/Register";
import Chip from "./components/FieldEmissions/core/server/Chip";
function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/People" element={<PeoplePage />} />
          <Route path="/Biosensing" element={<Biosensing />} />
          <Route path="/EBeam" element={<EBeam />} />
          <Route path="/EnergyStorage" element={<EnergyStorage />} />
          <Route path="/Biosensor" element={<Biosensor />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Chip" element={<Chip />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
